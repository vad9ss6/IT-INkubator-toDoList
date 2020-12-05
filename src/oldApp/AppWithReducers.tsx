import React, {useReducer} from 'react';
import '../App.css';
import s from '../App.module.css'
import TodoList from "../components/TodoLists/TodoList";
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, createStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AddTodoListAC, ChangeTodoListFilterAC, RemoveTodoListAC, todoListsReducer} from "../state/todo-lists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../state/tasks-reducer";

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

function AppWithReducers() {
    const id1TodoList = v1()
    const id2TodoList = v1()

    const [todoLists, dispatchToTodoList] = useReducer(todoListsReducer,[
        {
            id: id1TodoList,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: id2TodoList,
            title: 'What to buy ',
            filter: 'completed'
        }

    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [id1TodoList]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'Js', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [id2TodoList]: [
            {id: v1(), title: 'MacBook', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: false},
            {id: v1(), title: 'ice cream', isDone: false},
        ],
    })

    const removeTask = (idTask: string, idTodo: string) => {
        const action = removeTaskAC(idTask, idTodo)
        dispatchToTasks(action)
    }
    const addTask = (title: string, idTodo: string) => {
        const action = addTaskAC(title, idTodo)
        dispatchToTasks(action)
    }
    const changeStatus = (idTask: string, isDone: boolean, todoListId: string) => {
        const action = changeStatusAC(idTask, isDone, todoListId)
        dispatchToTasks(action)
    }
    const editTitleTask = (newTitle: string, idTask:string, todoListId: string) =>{
        const action = changeTaskTitleAC(newTitle , idTask, todoListId)
        dispatchToTasks(action)
    }
    const removeTodoList = (todoListId:string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatchToTodoList(action)

    }
    const addTodo = (title: string) => {
        const acton = AddTodoListAC(title)
        dispatchToTodoList(acton)
        dispatchToTasks(acton)

    }
    const filterTodo = (activeTask: filterValueType, id: string) => {
        const action = ChangeTodoListFilterAC(id, activeTask)
        dispatchToTodoList(action)
    }
    const classes = useStyles()
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
                        let taskForTodoList = allTodoListTasks
                        if (tl.filter === 'completed') {
                            taskForTodoList = allTodoListTasks.filter(t => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            taskForTodoList = allTodoListTasks.filter(t => !t.isDone)
                        }


                        return<TodoList
                            id={tl.id}
                            key={tl.id}
                            title={tl.title}
                            addTask={addTask}
                            filter={tl.filter}
                            removeTask={removeTask}
                            filterTodo={filterTodo}
                            tasks={taskForTodoList}
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

export default AppWithReducers;




