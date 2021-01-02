import React, { useState, useRef, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DoneIcon from "@material-ui/icons/Done";
import "./TodoHeader.css";

export default function TodoHeader({ addToList, editMode }) {
  const [inputValue, setInputValue] = useState(editMode ? editMode.value : "");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    console.log(editMode);
  });

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleInputSubmit = (event) => {
    addToList({
      id: Math.floor(Math.random() * 100),
      text: inputValue,
    });
    setInputValue("");
  };

  return (
    <form className="header-form">
      <input
        className="header-input"
        type="text"
        placeholder="Add a Todo"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
      ></input>

      {!editMode ? (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleInputSubmit}
        >
          <PostAddIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleInputSubmit}
        >
          <DoneIcon fontSize="large" />
        </IconButton>
      )}
    </form>
  );
}
