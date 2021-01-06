import {createStore, combineReducers} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todo-lists-reducer";

const combineReducer = combineReducers({
    tasks: tasksReducer,
    todoList: todoListsReducer
})

//@ts-ignore
export const store = createStore(combineReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
