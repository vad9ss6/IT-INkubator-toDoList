import React, {ChangeEvent, useCallback, useState} from 'react';

import '../../App.css';
import s from './TodoList.module.css'

import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from '@material-ui/core/Checkbox';
import {useStyles} from "../usestyle";



type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type filterValueType = 'all' | 'active' | 'completed'
type ProtoType = {
    id: string
    title: string
    tasks: Array<TasksType>
    filter: filterValueType
    removeTask: (id: string, todoListId: string) => void
    filterTodo: (activeTask: filterValueType, id: string) => void
    addTask: (title: string, id: string) => void
    changeStatus: (id: string, isDone: boolean, todoId: string) => void
    removeTodoList: (id: string) => void
    editTitleTask: (value: string, id: string, idTodo: string) => void
    editTodoTitle: (value: string, id: string) => void
}

const TodoList = React.memo<ProtoType>(({removeTodoList,id,addTask ,filterTodo, ...props}) => {
    const [activeBtn, setActiveBtn] = useState<filterValueType>(props.filter)
    console.log('TODO-LIST')

    let taskForTodoList = props.tasks

    if (props.filter === 'completed') {
        taskForTodoList = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        taskForTodoList = props.tasks.filter(t => !t.isDone)
    }
    const classes = useStyles()
    const task = taskForTodoList.map(t => {
        const onClickHandler = () => props.removeTask(t.id, id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, id)

        }
        const styleCompletedTask = {
            textDecoration: t.isDone ? 'line-through' : ''

        }
        return <li key={t.id} style={styleCompletedTask} className={s.items}>
            <div>
                <Checkbox
                    onChange={onChangeHandler} checked={t.isDone} className={classes.rootCheckBox}  inputProps={{'aria-label': 'primary checkbox'}}
                />
                <EditableSpan title={t.title}
                              editTitleTask={props.editTitleTask}
                              idTaskTitle={t.id} idTodo={id} />
            </div>
            <IconButton aria-label="delete" className={classes.rootBtnDelete} onClick={onClickHandler}>
                <DeleteIcon fontSize="large" />
            </IconButton>
        </li>

    })

    const removeTodo = useCallback(() => {
        removeTodoList(id)
    }, [removeTodoList, id])
    const onClickHandler = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])
    const onClickAllHandler = useCallback(() => {
        filterTodo('all', id)
        setActiveBtn('all')
    },[filterTodo, id])
    const onClickActiveHandler = useCallback(() => {
        filterTodo('active', id)
        setActiveBtn('active')
    },[filterTodo, id])
    const onClickCompletedHandler = useCallback(() => {
        filterTodo('completed', id)
        setActiveBtn('completed')
    },[filterTodo, id])

    return (
        <Paper className={classes.rootPaper}>
            <div className={s.headerPaper}>
                <div className={s.titleContainer}>
                    <EditableSpan title={props.title} idTodo={id} editTitleTask={props.editTodoTitle} idTaskTitle={id}/>
                    <div className={s.titleBtn}>
                        <Button onClick={removeTodo} className={classes.rootBtn}>x</Button>
                    </div>
                </div>
                <div>
                    <AddItemForm add={onClickHandler} titleForm={'Set a task'}/>
                </div>
            </div>
            <ul className={s.listTask}>
                {(taskForTodoList.length) ? task : <strong>no task</strong>}
            </ul>
            <div >
            <ButtonGroup fullWidth={true} >
                <Button className={classes.rootBtnGroup} variant={activeBtn === 'all' ? 'contained' : 'outlined'}
                            onClick={onClickAllHandler}>All</Button>
                <Button className={classes.rootBtnGroup} variant={activeBtn === 'active' ? 'contained' : 'outlined'}
                            onClick={onClickActiveHandler}>Active</Button>
                <Button className={classes.rootBtnGroup} variant={activeBtn === 'completed' ? 'contained' : 'outlined'}
                            onClick={onClickCompletedHandler}>Completed</Button>
            </ButtonGroup>
            </div>
        </Paper>
    )
})

export default TodoList;