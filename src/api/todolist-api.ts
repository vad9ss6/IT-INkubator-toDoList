import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers:{
        'api-key': '6fc83ead-7a8f-46b1-893b-8465afa55caf'
    }
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const todoListAPI = {
    getTodoList(){
       return  instance.get<Array<TodolistType>>('todo-lists')
    },
    postTodoList(){
       return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title: 'hello'})
    },
    deleteTodoList(todoListId: string){
       return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoList(){
        let todolistId = '2d2ac26a-4902-437a-88c3-232573dfd1f9'
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: 'hi hey'})
    }
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    low,
    Middle,
    Hi,
    Urgently,
    later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const todoListTaskAPI = {
    getTask(todoListId: string){
        return instance.get(`/todo-lists/${todoListId}/tasks`)
    },
    postTask(todoListId: string, title: string){
        return instance.post(`/todo-lists/${todoListId}/tasks`, {title: `${title}`})
    },
    deleteTask(todolistId: string,taskId: string){
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
