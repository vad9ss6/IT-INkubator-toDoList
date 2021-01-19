import {createStore, combineReducers, applyMiddleware} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todo-lists-reducer";
import thunk from 'redux-thunk'

const combineReducer = combineReducers({
    tasks: tasksReducer,
    todoList: todoListsReducer
})

export type IGlobalState = ReturnType<typeof combineReducer>;

//@ts-ignore window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(combineReducer, applyMiddleware(thunk))
