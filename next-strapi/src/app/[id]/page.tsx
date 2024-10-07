'use client'

import { Todos, TodosApi } from "@/api/TodoApi";
import { TodoListApi } from "@/api/TodoListApi";
import CreateForm from "@/components/createForm/CreateForm";
import Todo from "@/components/todo/Todo";
import React, { ChangeEvent, useEffect, useState } from "react";

import styles from "./page.module.css"

interface Props {
    params: {
        id: string;
    };
}

const todoListApi = TodoListApi.getInstance();
const todosApi = TodosApi.getInstance();

type Sort = 'default' | 'sort';

const TodoListPage = ({ params }: Props) => {
    const [todos, setTodos] = useState<Todos | undefined>(undefined);
    const [sort, setSort] = useState<Sort>('default');

    useEffect(() => {
        todoListApi.getTodoListById(+params.id).then(res => setTodos(res.data.attributes.todos));
    }, []);

    const sortTodos = (e: ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value as Sort);
    };

    const sortedTodos = () => {
        if (todos) {
            if (sort === 'sort') {
                return todos.data.slice().sort((a, b) => {
                    return (b.attributes.is_complite ? 1 : 0) - (a.attributes.is_complite ? 1 : 0);
                });
            }
        }
        return todos?.data;
    };

    return (
        <main className={styles.container}>
            <div className={styles.sort}>
                <select onChange={sortTodos} value={sort}>
                    <option value="default">без сортировки</option>
                    <option value="sort">выполненные</option>
                </select>
            </div>
            <section className={styles.todos}>
                <div className={styles.todosItems}>
                    {sortedTodos()?.map((item) => (
                        <Todo key={item.id} todo={item.attributes} id={item.id} setTodos={setTodos} />
                    ))}
                </div>
            
                <CreateForm
                    formFields={{ title: '', description: '' }}
                    data={{ title: '', description: '', is_complite: false }}
                    api={todosApi}
                    relationFields={{todo_list: +params.id}}
                />
                
            </section>
        </main>
    );
}

export default TodoListPage;
