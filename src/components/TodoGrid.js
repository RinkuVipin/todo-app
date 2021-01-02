import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  SelectableTile,
  GridStyled,
  GridHeaderStyled,
  RowStyled,
} from "./Styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RedoIcon from "@material-ui/icons/Redo";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import { completeTask, removeTask } from "../redux/actions";
import TodoDialog from "./TodoDialog";

function TodoGrid(props) {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [updateMode, setUpdateMode] = useState(false);

  const { updateTodo, removeTodo } = props;

  const [titleEdit, setTitleEdit] = useState("");
  const [taskEdit, setTaskEdit] = useState("");
  const [taskId, setTaskId] = useState(0);

  const findElement = (event) => {
    let titleValue = event.target.getAttribute("title-value");
    let taskValue = event.target.getAttribute("task-value");
    let taskId = event.target.getAttribute("task-id");
    console.log(event.target);
    if (taskValue) {
      setTaskEdit(taskValue);
      setTitleEdit(titleValue);
      setTaskId(taskId);
    } else {
      let parentElement = event.target.parentElement;
      let parentTitleValue = parentElement.getAttribute("title-value");
      let parentTaskValue = parentElement.getAttribute("task-value");
      let parentTaskId = parentElement.getAttribute("task-id");
      if (parentTaskValue) {
        setTaskEdit(parentTaskValue);
        setTitleEdit(parentTitleValue);
        setTaskId(parentTaskId);
      } else {
        let ancestorElement = parentElement.parentElement;
        let ancestorTitleValue = ancestorElement.getAttribute("title-value");
        let ancestorTaskValue = ancestorElement.getAttribute("task-value");
        let ancestorTaskId = ancestorElement.getAttribute("task-id");
        if (ancestorTaskValue) {
          setTaskEdit(ancestorTaskValue);
          setTitleEdit(ancestorTitleValue);
          setTaskId(ancestorTaskId);
        }
      }
    }
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setUpdateMode(true);
    findElement(event);
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    findElement(event);
    if (titleEdit) props.removeTask(titleEdit, taskId);
  };

  const handleTaskDoneClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    findElement(event);
    if (titleEdit) props.completeTask(titleEdit, taskId);
  };

  if (updateMode) {
    return (
      <TodoDialog
        editMode={updateMode}
        titleEdit={titleEdit}
        taskEdit={taskEdit}
        taskId={taskId}
        setUpdateMode={setUpdateMode}
      />
    );
  }

  return (
    <GridStyled>
      {props.todoList.map((item) => (
        <SelectableTile key={item.titleId}>
          <GridHeaderStyled>
            <Fragment>
              <div>{item.titleId}</div>
              {item.taskIds.map((task) => (
                <RowStyled>
                  <div style={{ padding: "14px" }}>{task.todo}</div>

                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                  >
                    <ToggleButton
                      title-value={item.titleId}
                      task-value={task.todo}
                      task-id={task.todoId}
                      aria-label="Edit"
                      onClick={(e) => handleEditClick(e)}
                    >
                      <EditIcon onClick={(e) => handleEditClick(e)} />
                    </ToggleButton>
                    <ToggleButton
                      title-value={item.titleId}
                      task-value={task.todo}
                      task-id={task.todoId}
                      aria-label="Remove"
                      onClick={(e) => handleRemoveClick(e)}
                    >
                      <DeleteIcon onClick={(e) => handleRemoveClick(e)} />
                    </ToggleButton>
                    <ToggleButton
                      title-value={item.titleId}
                      task-value={task.todo}
                      task-id={task.todoId}
                      aria-label="Done"
                      disabled={task.isDone}
                      onClick={(e) => handleTaskDoneClick(e)}
                    >
                      <DoneIcon onClick={(e) => handleTaskDoneClick(e)} />
                    </ToggleButton>
                    <ToggleButton
                      title-value={item.titleId}
                      task-value={task.todo}
                      task-id={task.todoId}
                      aria-label="Redo"
                      disabled={!task.isDone}
                      onClick={(e) => handleTaskDoneClick(e)}
                    >
                      <RedoIcon onClick={(e) => handleTaskDoneClick(e)} />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </RowStyled>
              ))}
            </Fragment>
          </GridHeaderStyled>
        </SelectableTile>
      ))}
    </GridStyled>
  );
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    titleNames: state.titleNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTask: (titleName, taskId) => dispatch(removeTask(titleName, taskId)),
    completeTask: (titleId, taskId) => dispatch(completeTask(titleId, taskId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoGrid);
