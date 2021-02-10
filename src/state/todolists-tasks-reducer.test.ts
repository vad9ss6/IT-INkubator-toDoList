import {tasksReducer} from "../redux/tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC, TodoListDomainType, todoListsReducer} from "../redux/todo-lists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: { [key: string]: Array<TaskType> } = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

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
    const startTasksState: { [key: string]: Array<TaskType> } = {
        ['1']:
            [{
                id: 'gjgjg',
                title: 'value',
                status: TaskStatuses.Completed,
                startDate: '',
                priority: TaskPriorities.Middle,
                todoListId:'',
                order: 0,
                description: '',
                deadline: '',
                addedDate: ''
            }]
    };
    const startTodoListsState: Array<TodoListDomainType> = [{
        id: "1",
        title: "ccccc",
        filter: "all",
        addedDate: '',
        order: 0
    }];

    const action = RemoveTodoListAC('1',);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)


    expect(endTasksState).toEqual({});
    expect(endTodoListsState).toEqual([]);
});