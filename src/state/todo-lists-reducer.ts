import {v1} from "uuid";

type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
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

const initialState:Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            const newTodoList:TodoListType = {id: action.todoListId, title: action.title, filter: "all"}
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

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const AddTodoListAC = (newTodoListTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodoListTitle, todoListId: v1()}
}
export const ChangeTodoListTitleAC = (id: string , title: string): ChangeTodolistTitleActionType =>{
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType =>{
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

