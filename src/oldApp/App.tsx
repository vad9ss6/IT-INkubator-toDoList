import React, {useState} from 'react';
import '../App.css';
import s from '../App.module.css'
import TodoList from "../components/TodoLists/TodoList";
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, createStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";

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

function App() {
    const id1TodoList = v1()
    const id2TodoList = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
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
    const [tasks, setTasks] = useState<tasksStateType>({
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

    const addTodo = (title: string) => {
        let newTodoListId = v1()
        let newTodoList: todoListType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter((tl => tl.id !== todoListId))
        setTodoLists(filteredTodoList)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const removeTask = (id: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)

        setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId]

        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        let todoListTasks = tasks[todoListId]

        let task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }
    const filterTodo = (activeTask: filterValueType, id: string) => {
        const todoList = todoLists.find(td => td.id === id)
        if (todoList) {
            todoList.filter = activeTask
            setTodoLists([...todoLists])
        }
    }

    const editTitleTask = (title:string, idTask: string, idTodo: string) =>{
        const task = tasks[idTodo].find(t => t.id === idTask)
        if(task){
            task.title = title

            setTasks({...tasks})

        }

    }

    // const filterTodo = (activeTask: filterValueType, id:string) =>{
    //     const newTodoLists = todoLists.map(tl => {
    //         if(tl.id === id){
    //             tl.filter = activeTask
    //         }
    //         return tl
    //     })
    //     setTodoLists(newTodoLists)
    // }

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

export default App;




