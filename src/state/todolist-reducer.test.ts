
import {v1} from 'uuid';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterValuesType,
    RemoveTodoListAC, TodoListDomainType,
    todoListsReducer
} from "../redux/todo-lists-reducer";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId2))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New todo list'
    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New todo list'
    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

