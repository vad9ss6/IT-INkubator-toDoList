import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from "./todo-lists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todoListTaskAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {IGlobalState} from "../redux/redux-store";


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
    title: string
    todoListId: string
}
export type changeStatusType = {
    type: 'CHANGE-STATUS'
    idTask: string
    status: TaskStatuses
    todoListId: string
}
export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    idTask: string
    newTitle: string
    todoListId: string
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
            const newTask: TaskType =
                {
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    todoListId: action.todoListId,
                    priority: TaskPriorities.Middle,
                    startDate: ''
                }
            const todoList = state[action.todoListId]

            copyState[action.todoListId] = [newTask, ...todoList]
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
export const addTaskAC = (title: string, todoListId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeStatusAC = (idTask: string, status: TaskStatuses, todoListId: string): changeStatusType => {
    return {type: "CHANGE-STATUS", idTask, status, todoListId}
}
export const changeTaskTitleAC = (newTitle: string, idTask: string, todoListId: string): changeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', idTask, newTitle, todoListId}
}
export const setTasksAC = (todoListId: string, items: Array<TaskType>): setTasksType => {
    return {type: 'SET-TASKS', todoListId, items}
}


export const setTasksTC = (todoId: string) => {
    return (dispatch: Dispatch, getState: IGlobalState) => {
        todoListTaskAPI.getTask(todoId)
            .then(res => {
                dispatch(setTasksAC(todoId, res.data.items))
            })
    }
}

