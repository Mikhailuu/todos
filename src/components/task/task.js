import "./task.css";
import React from "react";
import PropTypes from "prop-types";

import Timer from "./timer";

const Task = ({ description, duration, onToggleTask, onDeleted, onEdit }) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onToggleTask}></input>
      <label>
        <span className="title">{description}</span>
        <Timer date={new Date()} duration={duration} />
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
};

Task.defaultProps = {
  description: "",
  onToggleTask: () => {},
  onDeleted: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  description: PropTypes.string,
  onToggleTask: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;
