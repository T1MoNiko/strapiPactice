'use client'

import React from "react";

import styles from "./Todo.module.css"
import Button from "../button/Button";
import { TodoAttributes, TodosApi } from "@/api/TodoApi";

type Props = {
    todo: TodoAttributes
}

const todosApi = TodosApi.getInstance();

const Todo = ({todo}: Props) => {
    const deleteItem = async () => {
        try {
            const response = await todosApi.deleteTodo(5); 
            console.log('Элемент успешно удален', response);
        } catch (error) {
            console.error('Ошибка при удалении элемента:', error);
        }
    };

    return ( 
        <div className={styles.todoContainer}>
            <div>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
            </div>
            <Button className={styles.todoDeleteBtn} onClick={deleteItem}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ab2f2f" className={styles.trash} viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </Button>
        </div>
     );
}

export default Todo;