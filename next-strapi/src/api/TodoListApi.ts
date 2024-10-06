import axios, {AxiosInstance} from "axios";
import {HttpInstanceFactory} from "@/api/HttpInstanceFactory";
import {APIResponse, APIResponseCollection, GetValues} from "@/types/types";
import {Common} from "@strapi/strapi";

const schemaId: Common.UID.Schema = 'api::todo-list.todo-list';
export type TodoList = APIResponse<typeof schemaId>;
export type TodoLists = APIResponseCollection<typeof schemaId>;
export type TodoListAttributes = GetValues<typeof schemaId>;

export class TodosApi {
    private static instance: TodosApi;
    private httpInstance: AxiosInstance;

    constructor() {
        this.httpInstance = HttpInstanceFactory.getInstance();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new TodosApi();
        }
        return this.instance;
    }

    public async getTodoById(id: number){
        return (await this.httpInstance.get<TodoList>(`/todo-lists/${id}`)).data;
    }

    public async getTodos() {
        return (await this.httpInstance.get<TodoLists>('/todo-lists')).data;
    }

    public async deleteTodoList(id: number) {
        return (await this.httpInstance.delete<TodoList>(`/todo-lists/${id}`)).data
    }

    public async addTodoList(id: number) {
        return (await this.httpInstance.delete<TodoList>(`/todo-lists/${id}`)).data
    }
}