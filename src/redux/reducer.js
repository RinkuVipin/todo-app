const {
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
  DONE_TASK,
  ADD_TITLE,
} = require("./actionTypes");

const initialState = {
  titleNames: ["Yesterday", "Today", "Tomorrow"],
  todoTask: {
    todoId: 0,
    todo: "",
    isDone: false,
  },

  todoList: [
    {
      titleId: "Today",
      taskIds: [{ todoId: 67, todo: "Learn Well", isDone: false }],
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TITLE:
      let titleNames = state.titleNames;
      let isPresent = titleNames.find((task) => task === action.titleName);
      if (!isPresent) {
        titleNames.push(action.titleName);
      }

      return {
        ...state,
        titleNames,
      };

    case ADD_TASK:
      let newTodoTask = {
        todoId: Math.floor(Math.random() * 100),
        todo: action.taskName,
        isDone: false,
      };

      let isNewTitle = false;
      let newTodoList = state.todoList;
      let newData = newTodoList.map((title) => {
        if (title.titleId === action.titleName) {
          title.taskIds.push(newTodoTask);
          isNewTitle = false;
          return;
        } else {
          isNewTitle = true;
        }
      });
      if (isNewTitle) {
        let newTitle = {
          titleId: action.titleName,
          taskIds: [newTodoTask],
        };
        newTodoList.push(newTitle);
      }

      console.log(state);

      return {
        ...state,
        todoTask: newTodoTask,
        todoList: [...newTodoList],
      };
    case UPDATE_TASK:
      console.log("todoLists");
      let UpdatedtodoList = state.todoList;
      UpdatedtodoList.map((title) => {
        if (title.titleId === action.titleName) {
          title.taskIds.map((item) => {
            console.log(action);
            console.log(item.todoId);
            if (item.todoId === +action.taskId) {
              console.log("Found Task");
              item.todo = action.taskName;
            }
          });
        }
      });
      console.log(UpdatedtodoList);
      return {
        ...state,
        todoList: [...UpdatedtodoList],
      };
    case REMOVE_TASK:
      console.log("Inside Delete Process");
      let removedtodoLists = state.todoList;
      removedtodoLists.map((title) => {
        console.log(action.taskId);
        if (title.titleId === action.titleName) {
          let indexVal = title.taskIds.findIndex((item, index) => {
            console.log(item);
            if (item.todoId === +action.taskId) return true;
          });
          console.log(indexVal);
          if (indexVal > -1) title.taskIds.splice(indexVal, 1);
        }
      });
      console.log(removedtodoLists);
      return {
        ...state,
        todoList: [...removedtodoLists],
      };

    case DONE_TASK:
      let donetodoList = state.todoList;
      donetodoList.map((title) => {
        if (title.titleId === action.titleName) {
          title.taskIds.map((item) => {
            console.log(action);
            console.log(item.todoId);
            if (item.todoId === +action.taskId) {
              console.log("Found Task");
              item.isDone = !item.isDone;
            }
          });
        }
      });
      console.log(donetodoList);
      return {
        ...state,
        todoList: [...donetodoList],
      };
    default:
      return state;
  }
};

export default reducer;
