import {createStore, combineReducers, applyMiddleware} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todo-lists-reducer";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';



const combineReducer = combineReducers({
    tasks: tasksReducer,
    todoList: todoListsReducer
})

export type IGlobalState = ReturnType<typeof combineReducer>;


export const store = createStore(combineReducer,  composeWithDevTools(applyMiddleware(thunk)))
