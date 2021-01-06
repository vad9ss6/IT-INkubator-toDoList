import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC, todoListsReducer} from "./todo-lists-reducer";
import {filterValueType, tasksStateType, todoListType} from "../AppWithRedux";
import {v1} from "uuid";

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


test('correct remove todo list ', () => {
    const startTasksState: tasksStateType = {['1']:[{id:'gjgjg', title:'value', isDone:true}]};
    const startTodoListsState: Array<todoListType> = [{id: "1", title: "ccccc", filter: "all"}];

    const action = RemoveTodoListAC('1', );

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)



    expect(endTasksState).toEqual({});
    expect(endTodoListsState).toEqual([]);
});