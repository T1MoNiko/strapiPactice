import axios, {AxiosInstance} from "axios";
import {HttpInstanceFactory} from "@/api/HttpInstanceFactory";
import {APIResponse, APIResponseCollection, GetValues} from "@/types/types";
import {Common} from "@strapi/strapi";

const schemaId: Common.UID.Schema = 'api::todo.todo';
export type Todo = APIResponse<typeof schemaId>;
export type Todos = APIResponseCollection<typeof schemaId>;
export type TodoAttributes = GetValues<typeof schemaId>;

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
        return (await this.httpInstance.get<Todo>(`/todo/${id}`)).data;
    }

    public async getTodos() {
        return (await this.httpInstance.get<Todos>('/todos')).data;
    }

    public async deleteTodo(id: number) {
        return (await this.httpInstance.delete<Todo>('/todos/' + id)).data
    }

    public async create(data: TodoAttributes) {
        return await this.httpInstance.post<Todo>('/todos', {
            data: {
                ...data
            }
        })
    }

    public async update(id:number, data: TodoAttributes) {
        console.log(data)
        return await this.httpInstance.put<Todo>(`/todos/${id}`, {
            data: {
                ...data
            }
        })
    }
}