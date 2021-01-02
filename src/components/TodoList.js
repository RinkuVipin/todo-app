import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import RedoIcon from "@material-ui/icons/Redo";
import TodoHeader from "./TodoHeader";

export default function TodoList(props) {
  const { todoList, updateTodo, removeTodo, completeTodo } = props;
  const [todoEdit, setTodoEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(todoEdit.id, value);
    setTodoEdit({
      id: null,
      value: "",
    });
  };

  if (todoEdit.id) {
    return <TodoHeader editMode={todoEdit} addToList={submitUpdate} />;
  }

  return (
    <>
      {todoList.map((todoTask, index) => (
        <div key={index}>
          <div>HEADER</div>
          <div key={todoTask.id}>
            {todoTask.text}
            <IconButton
              onClick={() =>
                setTodoEdit({ id: todoTask.id, value: todoTask.text })
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => removeTodo(todoTask.id)}>
              <DeleteIcon />
            </IconButton>
            {todoTask.isDone ? (
              <IconButton onClick={() => completeTodo(todoTask.id)}>
                <RedoIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => completeTodo(todoTask.id)}>
                <DoneIcon />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
