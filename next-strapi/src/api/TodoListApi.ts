import axios, {AxiosInstance} from "axios";
import {HttpInstanceFactory} from "@/api/HttpInstanceFactory";
import {APIResponse, APIResponseCollection, GetValues} from "@/types/types";
import {Common} from "@strapi/strapi";

const schemaId: Common.UID.Schema = 'api::todo-list.todo-list';
export type TodoList = APIResponse<typeof schemaId>;
export type TodoLists = APIResponseCollection<typeof schemaId>;
export type TodoListAttributes = GetValues<typeof schemaId>;

export class TodoListApi {
    private static instance: TodoListApi;
    private httpInstance: AxiosInstance;

    constructor() {
        this.httpInstance = HttpInstanceFactory.getInstance();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new TodoListApi();
        }
        return this.instance;
    }

    public async getTodoListById(id: number){
        return (await this.httpInstance.get<TodoList>(`/todo-lists/${id}?populate=todos`)).data;
    }

    public async getTodoLists() {
        return (await this.httpInstance.get<TodoLists>('/todo-lists')).data;
    }

    public async deleteTodoList(id: number) {
        return (await this.httpInstance.delete<TodoList>(`/todo-lists/${id}`)).data
    }

    public async create(data: TodoListAttributes) {
        return await this.httpInstance.post<TodoList>('/todo-lists', {
            data: {
                ...data
            }
        })
    }
}