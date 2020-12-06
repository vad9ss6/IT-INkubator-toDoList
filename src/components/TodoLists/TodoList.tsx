import React, {ChangeEvent, useState} from 'react';
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



const TodoList = React.memo((props: ProtoType) => {
    const [activeBtn, setActiveBtn] = useState<filterValueType>(props.filter)
    console.log('TODO-LIST')
    const classes = useStyles()

    let taskForTodoList = props.tasks

    if (props.filter === 'completed') {
        taskForTodoList = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        taskForTodoList = props.tasks.filter(t => !t.isDone)
    }

    const task = taskForTodoList.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)

        }
        const styleCompletedTask = {
            textDecoration: t.isDone ? 'line-through' : ''

        }
        return <li key={t.id} style={styleCompletedTask} className={s.items}>

            <Checkbox
                onChange={onChangeHandler} checked={t.isDone} className={classes.rootCheckBox}  inputProps={{'aria-label': 'primary checkbox'}}
            />
            <EditableSpan title={t.title}
                          editTitleTask={props.editTitleTask}
                          idTaskTitle={t.id} idTodo={props.id}/>

            <IconButton aria-label="delete" className={classes.rootBtnDelete} onClick={onClickHandler}>
                <DeleteIcon fontSize="large" />
            </IconButton>
        </li>

    })

    const removeTodo = () => {
        props.removeTodoList(props.id)
    }
    const onClickHandler = (title: string) => {
        props.addTask(title, props.id)
    }
    const onClickAllHandler = () => {
        props.filterTodo('all', props.id)
        setActiveBtn('all')
    }
    const onClickActiveHandler = () => {
        props.filterTodo('active', props.id)
        setActiveBtn('active')
    }
    const onClickCompletedHandler = () => {
        props.filterTodo('completed', props.id)
        setActiveBtn('completed')
    }


debugger
    return (
        <Paper className={classes.rootPaper}>
            <div className={s.headerPaper}>
                <div className={s.titleContainer}>
                    <EditableSpan title={props.title} idTodo={props.id} editTitleTask={props.editTodoTitle} idTaskTitle={props.id}/>{/*<h3>{props.title}</h3>*/}
                    <Button onClick={removeTodo} className={classes.rootBtn}>x</Button>
                </div>
                <div>
                    <AddItemForm add={onClickHandler}/>
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