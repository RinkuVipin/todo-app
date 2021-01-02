const {
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
  ADD_TITLE,
  DONE_TASK,
} = require("./actionTypes");

export const addTitle = (newTitle) => {
  return {
    type: ADD_TITLE,
    titleName: newTitle,
  };
};

export const addTask = (newTitle, newTask) => {
  return {
    type: ADD_TASK,
    titleName: newTitle,
    taskName: newTask,
  };
};

export const updateTask = (editTitle, taskId, editTask) => {
  return {
    type: UPDATE_TASK,
    titleName: editTitle,
    taskName: editTask,
    taskId: taskId,
  };
};

export const removeTask = (titleName, taskId) => {
  return {
    type: REMOVE_TASK,
    titleName: titleName,
    taskId: taskId,
  };
};

export const completeTask = (titleName, taskId) => {
  return {
    type: DONE_TASK,
    titleName: titleName,
    taskId: taskId,
  };
};
