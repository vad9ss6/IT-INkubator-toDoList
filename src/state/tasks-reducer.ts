import {AddTodolistActionType} from "./todo-lists-reducer";
import {tasksStateType} from "../AppWithReducers";
import {v1} from "uuid";


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
export type removeTodoListType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

type ActionType =
    | removeTaskActionType
    | addTaskActionType
    | changeStatusType
    | changeTaskTitleType
    | AddTodolistActionType
    | removeTodoListType

export const tasksReducer = (state: tasksStateType, action: ActionType):tasksStateType => {
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
            const copyState = {...state}
            const task = state[action.todoListId].find(t => t.id === action.idTask)
            if (task) {
                task.isDone = action.isDone
            }
            return copyState
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => {
                    if (t.id === action.idTask) return {...t, title: action.newTitle}
                    else return t
                })
            }
        }
        case 'ADD-TODOLIST': {
            const copyState = {...state}
            copyState[action.todoListId] = []

            return copyState
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state }
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
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
    return {type: 'CHANGE-TASK-TITLE', idTask,  newTitle, todoListId}
}
export const RemoveTodoListAC = (todoListId: string): removeTodoListType => {
    return {type: 'REMOVE-TODOLIST', todoListId}
}


