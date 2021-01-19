import {v1} from "uuid";
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
    title: string
    todoListId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
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
            const newTodoList: TodoListDomainType = {id: action.todoListId, title: action.title, filter: "all", addedDate: '', order: 0}
            return [
                ...state,
                newTodoList
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => {
                if (t.id === action.id) {
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
export const AddTodoListAC = (newTodoListTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodoListTitle, todoListId: v1()}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

export const fetchTodoLists = () => {
    return (dispatch: Dispatch) => {
        todoListAPI.getTodoList()
            .then((res) => {
                dispatch(SetTodoListsAC(res.data))
            })
    }
}

