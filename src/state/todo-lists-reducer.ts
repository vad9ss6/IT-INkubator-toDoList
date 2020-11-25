import {filterValueType, todoListType} from "../AppWithReducers";
import {v1} from "uuid";


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
    filter: filterValueType
}

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todoListsReducer = (state: Array<todoListType>, action: ActionType):Array<todoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            const newTodoList:todoListType = {id: action.todoListId, title: action.title, filter: "all"}
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
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const AddTodoListAC = (newTodoListTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodoListTitle, todoListId: v1()}
}
export const ChangeTodoListTitleAC = (id: string , title: string): ChangeTodolistTitleActionType =>{
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: filterValueType): ChangeTodolistFilterActionType =>{
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}