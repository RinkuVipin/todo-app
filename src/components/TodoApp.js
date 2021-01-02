import React, { useState } from "react";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addToList = (newTodo) => {
    let updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    let todoList = [...todos];
    let updatedTodos = todoList.map((task) =>
      task.id === todoId ? newValue : task
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (todoId) => {
    let todoList = [...todos];
    let updatedTodos = todoList.filter((task) => task.id !== todoId);
    setTodos(updatedTodos);
  };

  const completeTodo = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <TodoHeader addToList={addToList} />
      <TodoList
        todoList={todos}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
      />
    </div>
  );
}
