import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from "./todo-lists-reducer";
import { TaskStatuses, TaskType, todoListTaskAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    idTask: string
    todoListId: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type changeStatusType = {
    type: 'CHANGE-STATUS'
    idTask: string
    status: TaskStatuses
    todoListId: string
}
export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    task: TaskType
}
export type setTasksType = {
    type: 'SET-TASKS',
    todoListId: string
    items: Array<TaskType>
}

type ActionType =
    | removeTaskActionType
    | addTaskActionType
    | changeStatusType
    | changeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionType
    | setTasksType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODO-LISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;

        }
        case 'REMOVE-TASK': {
            const filteredTask = state[action.todoListId].filter(t => t.id !== action.idTask)
            return {
                ...state,
                [action.todoListId]: filteredTask
            }
        }
        case 'ADD-TASK': {
            const copyState = {...state}
            const todoList = state[action.task.todoListId]
            copyState[action.task.todoListId] = [action.task, ...todoList]
            return copyState
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => {
                    if (t.id === action.idTask) {
                        return {...t, status: action.status}
                    }
                    return t
                })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(t =>
                    (t.id === action.task.id)
                        ? {...t, title: action.task.title}
                        : t)
            }
        }
        case 'ADD-TODOLIST': {
            const copyState = {...state}
            copyState[action.todoList.id] = []

            return copyState
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todoListId] = action.items
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (idTask: string, idTodo: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', idTask, todoListId: idTodo}
}
export const addTaskAC = (task: TaskType): addTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeStatusAC = (idTask: string, status: TaskStatuses, todoListId: string): changeStatusType => {
    return {type: "CHANGE-STATUS", idTask, status, todoListId}
}
export const changeTaskTitleAC = (task: TaskType): changeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', task}
}
export const setTasksAC = (todoListId: string, items: Array<TaskType>): setTasksType => {
    return {type: 'SET-TASKS', todoListId, items}
}


export const fetchTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todoListTaskAPI.getTask(todoId)
            .then(res => {
                dispatch(setTasksAC(todoId, res.data.items))
            })
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todoListTaskAPI.deleteTask(todoListId, taskId).then( () =>{
            const action = removeTaskAC(taskId, todoListId)
            dispatch(action)
        })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListTaskAPI.postTask(todoListId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const changeTaskTitleTC = (todoListId: string, taskId: string, title: string ) => {
    return (dispatch: Dispatch) => {
        todoListTaskAPI.updateTask(todoListId, taskId, title)
            .then(res => {
                dispatch(changeTaskTitleAC(res.data.data.item))
            })
    }
}
