import { TodoListApi, TodoListAttributes, TodoLists } from "@/api/TodoListApi";
import Link from "next/link";
import React from "react";

import styles from "../todo/Todo.module.css"
import DeleteBtn from "../deleteBtn/DeleteBtn";

type Props = {
    todoList: TodoListAttributes,
    id: number,
    setState: React.Dispatch<React.SetStateAction<TodoLists | undefined>>
}

const todoListApi = TodoListApi.getInstance()

const TodoList = ({todoList, id, setState}: Props) => {
    const deleteItem = async () => {
        try {
          setState((prev) => {
            if (prev) {
              return {
                ...prev,
                data: prev.data.filter((todo) => todo.id !== id),
              };
            }
            return prev; 
          });
    
          await todoListApi.deleteTodoList(id); 
        } catch (error) {
          console.error('Ошибка при удалении элемента:', error);
        }
      };

    return ( 
        <div className={styles.todoContainer}>
            <div>
                <Link href={`/${id}`}><h2>{todoList.title}</h2></Link>
                <p>{todoList.description}</p>
            </div>
            <DeleteBtn onDelete={deleteItem}/>
        </div>
     );
}

export default TodoList;
