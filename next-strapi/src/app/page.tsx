import React from "react";

import { TodosApi } from "@/api/TodoApi";
import Todo from "@/components/todo/Todo";

const todosApi = TodosApi.getInstance();

const Home: React.FC = async () => {
  const todos = (await todosApi.getTodos()).data;

  return (
    <main>
      {todos.length ? todos.map((item) => 
        <Todo title={item.attributes.title} description={item.attributes.description}></Todo>
      ) : <h1>Создайте свой первый туду лист</h1>}
    </main>
  );
}

export default Home;