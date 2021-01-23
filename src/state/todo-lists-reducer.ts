import {todoListAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type SetTodoListsActionType = {
    type: 'SET-TODO-LISTS',
    todoLists: Array<TodolistType>
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todoList: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoListsActionType

const initialState: Array<TodoListDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET-TODO-LISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            // const newTodoList: TodoListDomainType = {id: action.todoListId, title: action.title, filter: "all", addedDate: '', order: 0}
            return [
                {...action.todoList, filter: 'all'},
                ...state
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => {
                if (t.id === action.todolistId) {
                    t.title = action.title
                }
                return t
            })

        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => {
                if (t.id === action.id) {
                    t.filter = action.filter
                }
                return t

            })
        }
        default:
            return state
    }
}

export const SetTodoListsAC = (todoLists: Array<TodolistType>): SetTodoListsActionType => {
    return {type: "SET-TODO-LISTS", todoLists}
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const AddTodoListAC = (todoList: TodolistType): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", todoList}
}
export const ChangeTodoListTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todoListAPI.getTodoList()
            .then((res) => {
                dispatch(SetTodoListsAC(res.data))
            })
    }
}

export const deleteTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListAPI.deleteTodoList(todoListId)
            .then(() => {
                dispatch(RemoveTodoListAC(todoListId))
        })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListAPI.postTodoList(title)
            .then(res =>{
                if(res.data.resultCode === 0) dispatch(AddTodoListAC(res.data.data.item))
            })
    }
}

export const changeTodoListTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListAPI.updateTodoList(todolistId, title)
            .then(() => {
                dispatch(ChangeTodoListTitleAC(todolistId, title))
            })
    }
}
