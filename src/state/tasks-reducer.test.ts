import {removeTaskAC, tasksReducer, addTaskAC, changeStatusAC, updateTaskAC} from '../redux/tasks-reducer';

import {AddTodoListAC} from "../redux/todo-lists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let startState: {
    [key: string]: Array<TaskType>
}

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            { id: "1", title: "CSS",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
            },
            { id: "2", title: "JS",
                status: TaskStatuses.Completed, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
            },
            { id: "3", title: "React",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
            }
        ],
        [todolistId2]: [
            { id: "1", title: "bread",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
            },
            { id: "2", title: "milk",
                status: TaskStatuses.Completed, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
            },
            { id: "3", title: "tea",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", todolistId2);
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todolistId1]: [
            { id: "1", title: "CSS",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
            },
            { id: "2", title: "JS",
                status: TaskStatuses.Completed, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
            },
            { id: "3", title: "React",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
            }
        ],
        [todolistId2]: [
            { id: "1", title: "bread",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
            },
            { id: "3", title: "tea",
                status: TaskStatuses.New, addedDate: '',
                deadline: '', description: '', order: 0,
                priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
            }
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC(todolistId2);
    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('juice');
    expect(endState[todolistId2][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be change', () => {
    const action = changeStatusAC("2", TaskStatuses.New, todolistId2);
    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].status).toBe(TaskStatuses.New);


})

test('the name of the specified task will be changed', () => {
    const newTaskTitle = 'beer'
    const action = updateTaskAC(newTaskTitle, '2', todolistId2);
    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].title).toBe(newTaskTitle);
})

test('new array should be added when new todolist is added', () => {
    const action = AddTodoListAC("new todolist");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(endState[newKey]).toEqual([]);
    expect(endState).toEqual(
        {
            [todolistId1]: [
                { id: "1", title: "CSS",
                    status: TaskStatuses.New, addedDate: '',
                    deadline: '', description: '', order: 0,
                    priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
                },
                { id: "2", title: "JS",
                    status: TaskStatuses.Completed, addedDate: '',
                    deadline: '', description: '', order: 0,
                    priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
                },
                { id: "3", title: "React",
                    status: TaskStatuses.New, addedDate: '',
                    deadline: '', description: '', order: 0,
                    priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId1
                }
            ],
            [todolistId2]: [
                { id: "1", title: "bread",
                    status: TaskStatuses.New, addedDate: '',
                    deadline: '', description: '', order: 0,
                    priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
                },
                { id: "2", title: "milk",
                    status: TaskStatuses.Completed, addedDate: '',
                    deadline: '', description: '', order: 0,
                    priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
                },
                { id: "3", title: "tea",
                    status: TaskStatuses.New, addedDate: '',
                    deadline: '', description: '', order: 0,
                    priority: TaskPriorities.Middle, startDate: '', todoListId: todolistId2
                }
            ],
            [action.todoListId]: []
        }
    )

});
