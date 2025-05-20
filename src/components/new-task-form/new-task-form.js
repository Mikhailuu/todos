import "./new-task-form.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

const NewTaskForm = ({ onAddItem }) => {
  const [state, setState] = useState({
    label: "",
    min: "",
    sec: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (state.label !== "") onAddItem(state.label, state.min * 60 + Number(state.sec), false);

    setState({
      label: "",
      min: "",
      sec: "",
    });
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };
  return (
    <form className="new-todo-form" onKeyDown={onKeyDown}>
      <input
        type="text"
        className="new-todo"
        name="label"
        placeholder="Task"
        autoFocus
        onChange={(e) => onChange(e)}
        value={state.label}
      />
      <input
        type="text"
        inputMode="numeric"
        min="0"
        className="new-todo-form__timer"
        name="min"
        placeholder="Min"
        autoFocus
        onChange={(e) => onChange(e)}
        value={state.min}
      />
      <input
        type="text"
        inputMode="numeric"
        min="0"
        className="new-todo-form__timer"
        name="sec"
        placeholder="Sec"
        autoFocus
        onChange={(e) => onChange(e)}
        value={state.sec}
      />
    </form>
  );
};
NewTaskForm.defaultProps = {
  onAddItem: () => {},
};
NewTaskForm.propTypes = {
  onAddItem: PropTypes.func,
};

export default NewTaskForm;
