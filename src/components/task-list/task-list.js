import "./task-list.css";
import React from "react";
import PropTypes from "prop-types";

import Task from "../task";

import TaskEdit from "./task-edit";

const TaskList = ({ todos, onToggleTask, onDeleted, onEditTask, onChangeTask }) => {
  const items = todos.map((item) => {
    const { status, description, id } = item;
    return (
      <li key={id} className={status}>
        <Task
          description={description}
          onDeleted={() => onDeleted(id)}
          onToggleTask={() => onToggleTask(id)}
          onEdit={() => onEditTask(id)}
        />
        <TaskEdit defaultValue={description} onSubmit={onChangeTask} status={status} />
      </li>
    );
  });

  return <ul className="todo-list">{items}</ul>;
};

TaskList.defaultProps = {
  todos: [
    {
      status: "active",
      description: "",
    },
  ],
  onToggleTask: () => {},
  onDeleted: () => {},
  onEditTask: () => {},
  onChangeTask: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
  onToggleTask: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditTask: PropTypes.func,
  onChangeTask: PropTypes.func,
};

export default TaskList;
