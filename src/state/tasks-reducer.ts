import {AddTodolistActionType, RemoveTodolistActionType} from "./todo-lists-reducer";
import {v1} from "uuid";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    idTask: string
    todoListId: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
export type changeStatusType = {
    type: 'CHANGE-STATUS'
    idTask: string
    isDone: boolean
    todoListId: string
}
export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    idTask: string
    newTitle: string
    todoListId: string
}


type ActionType =
    | removeTaskActionType
    | addTaskActionType
    | changeStatusType
    | changeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const filteredTask = state[action.todoListId].filter(t => t.id !== action.idTask)
            return {
                ...state,
                [action.todoListId]: filteredTask
            }
        }
        case 'ADD-TASK': {
            const copyState = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            const todoList = state[action.todoListId]

            copyState[action.todoListId] = [newTask, ...todoList]
            return copyState
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => {
                    if (t.id === action.idTask) {
                        return {...t, isDone: action.isDone}
                    }
                    return t
                })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t =>
                    (t.id === action.idTask)
                    ? {...t, title: action.newTitle}
                    : t)
            }
        }
        case 'ADD-TODOLIST': {
            const copyState = {...state}
            copyState[action.todoListId] = []

            return copyState
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (idTask: string, idTodo: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', idTask, todoListId: idTodo}
}
export const addTaskAC = (title: string, todoListId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeStatusAC = (idTask: string, isDone: boolean, todoListId: string): changeStatusType => {
    return {type: "CHANGE-STATUS", idTask, isDone, todoListId}
}
export const changeTaskTitleAC = (newTitle: string, idTask: string, todoListId: string): changeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', idTask, newTitle, todoListId}
}

