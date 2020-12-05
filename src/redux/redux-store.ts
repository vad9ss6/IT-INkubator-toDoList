import {createStore, combineReducers} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todo-lists-reducer";

const combineReducer = combineReducers({
    tasks: tasksReducer,
    todoList: todoListsReducer
})

export const store = createStore(combineReducer)

