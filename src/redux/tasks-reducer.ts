import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from "./todo-lists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListTaskAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {IGlobalState} from "./redux-store";
import {setErrorAC, setStatusAC} from "./app-reducer";

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
export type updateTaskType = {
    type: 'UPDATE-TASK-TITLE'
    todoListId: string
    domainModel: UpdateDomainTaskModelType
    taskId: string
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
    | updateTaskType
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
        case 'UPDATE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t =>
                    (t.id === action.taskId)
                        ? {...t, ...action.domainModel}
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
export const updateTaskAC = (todoListId: string,  taskId: string, domainModel: UpdateDomainTaskModelType): updateTaskType => {
    return {type: 'UPDATE-TASK-TITLE',todoListId, taskId, domainModel }
}
export const setTasksAC = (todoListId: string, items: Array<TaskType>): setTasksType => {
    return {type: 'SET-TASKS', todoListId, items}
}


export const fetchTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todoListTaskAPI.getTask(todoId)
            .then(res => {
                dispatch(setTasksAC(todoId, res.data.items))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todoListTaskAPI.deleteTask(todoListId, taskId)
            .then(() => {
                const action = removeTaskAC(taskId, todoListId)
                dispatch(action)
                dispatch(setStatusAC('succeeded'))
        })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todoListTaskAPI.postTask(todoListId, title)
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(addTaskAC(res.data.data.item))

                }
                else {
                    if(res.data.messages.length){
                        dispatch(setErrorAC(res.data.messages[0]))
                    }
                }

            }).finally(() => dispatch(setStatusAC('succeeded')))
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => IGlobalState) => {

        const state = getState()
        const task = state.tasks[todoListId].find(task => task.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            status: task.status,
            startDate: task.startDate,
            ...domainModel
        }
        dispatch(setStatusAC('loading'))
        todoListTaskAPI.updateTask(todoListId, taskId, apiModel)
            .then(() => {
                dispatch(updateTaskAC(todoListId, taskId, apiModel))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

