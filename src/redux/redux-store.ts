import {createStore, combineReducers, applyMiddleware} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todo-lists-reducer";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {appReducer} from "./app-reducer";



const combineReducer = combineReducers({
    tasks: tasksReducer,
    todoList: todoListsReducer,
    appReducer: appReducer
})

export type IGlobalState = ReturnType<typeof combineReducer>;


export const store = createStore(combineReducer,  composeWithDevTools(applyMiddleware(thunk)))
