import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import '../../App.css';
import s from './TodoList.module.css'

import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Paper} from "@material-ui/core";

import {useStyles} from "../usestyle";
import {Task} from "./Task/Task";
import {FilterValuesType} from "../../redux/todo-lists-reducer";
import {TaskStatuses, TaskType} from '../../api/todolist-api';
import {fetchTasksTC} from "../../redux/tasks-reducer";


type ProtoType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todoListId: string) => void
    filterTodo: (activeTask: FilterValuesType, id: string) => void
    addTask: (title: string, id: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoId: string) => void
    removeTodoList: (id: string) => void
    editTitleTask: (value: string, id: string, idTodo: string) => void
    editTodoTitle: (value: string, id: string) => void
}



const TodoList = React.memo<ProtoType>(({removeTodoList, id, addTask, filterTodo, ...props}) => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    },[dispatch,id])
    const [activeBtn, setActiveBtn] = useState<FilterValuesType>(props.filter)

    let taskForTodoList = props.tasks

    if (props.filter === 'completed') {
        taskForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.filter === 'active') {
        taskForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    const classes = useStyles()
    // const task = taskForTodoList.map(t => {
    //     const onClickHandler = () => props.removeTask(t.id, id)
    //     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //         props.changeStatus(t.id, e.currentTarget.checked, id)
    //
    //     }
    //     const styleCompletedTask = {
    //         textDecoration: t.isDone ? 'line-through' : ''
    //
    //     }
    //     return <li key={t.id} style={styleCompletedTask} className={s.items}>
    //         <div>
    //             <Checkbox
    //                 onChange={onChangeHandler} checked={t.isDone} className={classes.rootCheckBox}  inputProps={{'aria-label': 'primary checkbox'}}
    //             />
    //             <EditableSpan title={t.title}
    //                           editTitleTask={props.editTitleTask}
    //                           idTaskTitle={t.id} idTodo={id} />
    //         </div>
    //         <IconButton aria-label="delete" className={classes.rootBtnDelete} onClick={onClickHandler}>
    //             <DeleteIcon fontSize="large" />
    //         </IconButton>
    //     </li>
    //
    // })

    const removeTodo = useCallback(() => {
        removeTodoList(id)
    }, [removeTodoList, id])
    const onClickHandler = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])
    const onClickAllHandler = useCallback(() => {
        filterTodo('all', id)
        setActiveBtn('all')
    }, [filterTodo, id])
    const onClickActiveHandler = useCallback(() => {
        filterTodo('active', id)
        setActiveBtn('active')
    }, [filterTodo, id])
    const onClickCompletedHandler = useCallback(() => {
        filterTodo('completed', id)
        setActiveBtn('completed')
    }, [filterTodo, id])

    return (
        <Paper className={classes.rootPaper}>
            <div className={s.headerPaper}>
                <div className={s.titleContainer}>
                    <EditableSpan title={props.title} idTodo={id} editTodoTitle={props.editTodoTitle} idTaskTitle={id}/>
                    <div className={s.titleBtn}>
                        <Button onClick={removeTodo} className={classes.closeBtn}>x</Button>
                    </div>
                </div>
                <div>
                    <AddItemForm add={onClickHandler} titleForm={'Set a task'}/>
                </div>
            </div>
            <ul className={s.listTask}>
                {/*{(taskForTodoList.length) ? task : <strong>no task</strong>}*/}
                {taskForTodoList.map(t => <Task id={t.id}
                                                key={t.id}
                                                title={t.title}
                                                status={t.status}
                                                idTodo={id}
                                                changeStatus={props.changeStatus}
                                                removeTask={props.removeTask}
                                                editTitleTask={props.editTitleTask}/>
                )}

            </ul>
            <div>
                <ButtonGroup  fullWidth={true} variant="contained" color="primary" aria-label="contained primary button group" >
                    <Button className={classes.rootBtnGroup} variant={activeBtn === 'all' ? 'contained' : 'outlined'}
                            onClick={onClickAllHandler}>All</Button>
                    <Button className={classes.rootBtnGroup} variant={activeBtn === 'active' ? 'contained' : 'outlined'}
                            onClick={onClickActiveHandler}>Active</Button>
                    <Button className={classes.rootBtnGroup}
                            variant={activeBtn === 'completed' ? 'contained' : 'outlined'}
                            onClick={onClickCompletedHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </Paper>
    )
})

export default TodoList;