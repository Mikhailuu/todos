import "./task-edit.css";
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TaskEdit = ({ defaultValue, status, onSubmit }) => {
  const [inputValue, setinputValue] = useState(defaultValue || "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (status === "editing" && inputRef.current) {
      inputRef.current.focus();
      setinputValue(defaultValue);
    }
  }, [status, defaultValue]);

  const handleChange = (e) => {
    setinputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue.trim());
  };

  if (status !== "editing") return null;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="edit"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
      />
    </form>
  );
};

TaskEdit.defaultProps = {
  onSubmit: () => {},
  defaultValue: "",
  status: "",
};
TaskEdit.propTypes = {
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.string,
  status: PropTypes.string,
};

export default TaskEdit;
