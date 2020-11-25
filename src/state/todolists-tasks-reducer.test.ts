import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, todoListsReducer} from "./todo-lists-reducer";
import {tasksStateType, todoListType} from "../App";

test('ids should be equals', () => {
    const startTasksState: tasksStateType = {};
    const startTodoListsState: Array<todoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodoLists).toBe(action.todoListId);
});
