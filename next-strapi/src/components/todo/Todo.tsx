'use client'

import React, { ChangeEvent } from "react";

import styles from "./Todo.module.css"
import { TodoAttributes, Todos, TodosApi } from "@/api/TodoApi";
import DeleteBtn from "../deleteBtn/DeleteBtn";

type Props = {
    todo: TodoAttributes,
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<Todos | undefined>>
}

const todosApi = TodosApi.getInstance();

const Todo = ({todo, id, setTodos}: Props) => {
    const deleteItem = async () => {
        try {
          setTodos((prev) => {
            if (prev) {
              return {
                ...prev,
                data: prev.data.filter((todo) => todo.id !== id),
              };
            }
            return prev; 
          });
    
          await todosApi.deleteTodo(id); 
        } catch (error) {
          console.error('Ошибка при удалении элемента:', error);
        }
      };

    const checked = async (e: ChangeEvent<HTMLInputElement>) => {
        location.reload();
        if (e.target.checked){
            await todosApi.update(id, {...todo, is_complite: true})
        } else {
            await todosApi.update(id, {...todo, is_complite: false})
        }

    }

    return ( 
        <div className={styles.todoContainer}>
            <div>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
            </div>
            <div className={styles.flex}>
                <DeleteBtn onDelete={deleteItem}/>
                <input type="checkbox" onChange={checked} checked={todo.is_complite}/>
            </div>
        </div>
     );
}

export default Todo;