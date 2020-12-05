import React, {useCallback} from 'react';
import './App.css';
import s from './App.module.css'
import TodoList from "./components/TodoLists/TodoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";

import {AppBar, Button, createStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";

import {AddTodoListAC, ChangeTodoListFilterAC, RemoveTodoListAC} from "./state/todo-lists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export type todoListType = {
    id: string
    title: string
    filter: filterValueType
}
export type tasksStateType = {
    [id: string]: Array<TasksType>
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterValueType = 'all' | 'active' | 'completed'

type AppRootStateType = {
    tasks: tasksStateType
    todoList: Array<todoListType>
}

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<todoListType>>(state => state.todoList)
    const tasks = useSelector<AppRootStateType, tasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((idTask: string, idTodo: string) => {
        const action = removeTaskAC(idTask, idTodo)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, idTodo: string) => {
        const action = addTaskAC(title, idTodo)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((idTask: string, isDone: boolean, todoListId: string) => {
        const action = changeStatusAC(idTask, isDone, todoListId)
        dispatch(action)
    }, [dispatch])
    const editTitleTask = useCallback((idTask:string, newTitle: string, todoListId: string) =>{
        const action = changeTaskTitleAC(idTask, newTitle, todoListId)
        dispatch(action)
    }, [dispatch])
    const removeTodoList = useCallback((todoListId:string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action)

    }, [dispatch])
    const addTodo = useCallback( (title: string) => {
        const acton = AddTodoListAC(title)
        dispatch(acton)
    },[dispatch])
    const filterTodo = useCallback((activeTask: filterValueType, id: string) => {
        const action = ChangeTodoListFilterAC(id, activeTask)
        dispatch(action)
    }, [dispatch])
    const classes = useStyles()
    console.log('APP')
    return (
        <div className={`App ${s.App}}`}>
            <div className={s.topNavBar}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={s.mainContent}>
                <AddItemForm add={addTodo}/>
                {
                    todoLists.map(tl => {
                        let allTodoListTasks = tasks[tl.id]
                        // let taskForTodoList = allTodoListTasks
                        // if (tl.filter === 'completed') {
                        //     taskForTodoList = allTodoListTasks.filter(t => t.isDone)
                        // }
                        // if (tl.filter === 'active') {
                        //     taskForTodoList = allTodoListTasks.filter(t => !t.isDone)
                        // }
                        return<TodoList
                            id={tl.id}
                            key={tl.id}
                            title={tl.title}
                            addTask={addTask}
                            filter={tl.filter}
                            removeTask={removeTask}
                            filterTodo={filterTodo}
                            tasks={allTodoListTasks}
                            changeStatus={changeStatus}
                            editTitleTask={editTitleTask}
                            removeTodoList={removeTodoList}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default AppWithRedux;




