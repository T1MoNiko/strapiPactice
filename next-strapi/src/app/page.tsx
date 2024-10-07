'use client'

import React, { useEffect, useState } from "react";

import CreateForm from "@/components/createForm/CreateForm";
import { TodoListApi, TodoLists } from "@/api/TodoListApi";
import TodoList from "@/components/todoList/TodoList";

import styles from "./page.module.css"

const todoListApi = TodoListApi.getInstance();

const TodoLists: React.FC = React.memo(() => {
  const [state, setState] = useState<TodoLists | undefined>()

  useEffect(() => {
    todoListApi.getTodoLists().then(res => setState(res));
  }, [state?.data.length])
  
  return (
    <main className={styles.container}>
      <div className={styles.todoLists}>
        {state?.data.length ? state.data.map((item) => 
          <TodoList key={item.id} todoList={item.attributes} setState={setState} id={item.id}></TodoList>
        ) : <h1>Создайте свой первый туду лист</h1>}
      </div>
      <CreateForm 
          formFields={{title:'', description: ''}}
          data={{title: '', description: '', todos: null}}
          api={todoListApi}
      />
    </main>
  );
}
)
export default TodoLists;