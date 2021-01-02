import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addTitle, addTask, updateTask } from "../redux/actions";

function TodoDialog(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [taskUnqId, setTaskUnqId] = useState(0);

  const titleRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    let titleValue = titleRef.current.value;
    if (props.editMode) {
      props.setUpdateMode(false);
      titleValue = title;
    }
    if (task && titleValue) {
      if (!props.editMode) {
        props.addTitle(titleValue);
        props.addTask(titleValue, task);
      } else {
        console.log("Calling Update");
        props.updateTask(titleValue, taskUnqId, task);
      }
    }
    console.log(titleValue);
    setOpen(false);
  };

  useEffect(() => {
    if (props.editMode) {
      setOpen(true);
      setTitle(props.titleEdit);
      setTask(props.taskEdit);
      setTaskUnqId(props.taskId);
      console.log(props.taskId);
    } else {
      setTitle("");
      setTask("");
    }
  }, [props]);

  return (
    <div>
      <div className="app-button">
        <Fab color="secondary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">THINGS TO DO</DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            disabled={props.editMode}
            options={props.titleNames.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.editMode ? title : "Title Name"}
                margin="normal"
                variant="outlined"
                inputRef={titleRef}
              />
            )}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            type="task"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    titleNames: state.titleNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTitle: (newTitle) => dispatch(addTitle(newTitle)),
    addTask: (newTitle, newTask) => dispatch(addTask(newTitle, newTask)),
    updateTask: (editTitle, taskId, editTask) =>
      dispatch(updateTask(editTitle, taskId, editTask)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDialog);
