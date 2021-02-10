import React, {useCallback, useEffect} from 'react';
import s from './AppWithRedux.module.css'
import TodoList from "./components/TodoLists/TodoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    createStyles,
    Grid,
    LinearProgress,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    addTodoListTC,
    ChangeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    fetchTodoListsTC,
    FilterValuesType,
    TodoListDomainType
} from "./redux/todo-lists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses} from './api/todolist-api';
import {IGlobalState} from "./redux/redux-store";
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import {RequestStatusType} from "./redux/app-reducer";



const useStyles = makeStyles((theme: Theme) => createStyles(
    {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);


function AppWithRedux() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])
    const todoLists = useSelector<IGlobalState, Array<TodoListDomainType>>(state => state.todoList)
    const tasks = useSelector<IGlobalState, TasksStateType>(state => state.tasks)
    const status = useSelector<IGlobalState, RequestStatusType>(state => state.appReducer.status)

    const removeTask = useCallback((idTask: string, idTodo: string) => {
        dispatch(removeTaskTC(idTodo, idTask))
    }, [dispatch])
    const addTask = useCallback((title: string, idTodo: string) => {
        dispatch(addTaskTC(idTodo, title))
    }, [dispatch])
    const changeStatus = useCallback((idTask: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTaskTC(todoListId, idTask, {status: status}, ))
    }, [dispatch])
    const editTitleTask = useCallback((todoListId: string, idTask: string, newTitle: string) => {
        dispatch(updateTaskTC(todoListId, idTask, {title: newTitle}))
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(deleteTodoListTC(todoListId))
    }, [dispatch])
    const addTodo = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])
    const filterTodo = useCallback((activeTask: FilterValuesType, id: string) => {
        const action = ChangeTodoListFilterAC(id, activeTask)
        dispatch(action)
    }, [dispatch])
    const editTodoTitle = useCallback((newTitle: string, todoListId: string) => {
       dispatch(changeTodoListTitleTC(todoListId, newTitle))
    }, [dispatch])

    const classes = useStyles()

    return (
        <>
            <div className={s.topNavBar}>
                <ErrorSnackbar />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress  color="secondary"/>}
            </div>
            <Container fixed className={s.containerTodo}>
                <Grid container justify="center">
                    <AddItemForm add={addTodo} titleForm={'Add Todo list'}/>
                </Grid>
                <Grid container spacing={1} justify="space-around">
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id]
                            return <Grid item key={tl.id}>
                                <TodoList
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
                                    editTodoTitle={editTodoTitle}
                                    removeTodoList={removeTodoList}
                                />
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </>
    );
}

export default AppWithRedux;




