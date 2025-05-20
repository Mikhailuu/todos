import "./task-list.css";
import React from "react";
import PropTypes from "prop-types";

import Task from "../task";

import TaskEdit from "./task-edit";

const TaskList = ({
  todos,
  isEditingAnyTask,
  editingId,
  onToggleTask,
  onDeleted,
  onEditTask,
  onChangeTask,
  onTimerPlay,
  onTimerStop,
}) => {
  const items = todos.map((item) => {
    const { status, description, id, duration, createdAt } = item;
    return (
      <li key={id} className={status}>
        <Task
          taskId={id}
          description={description}
          duration={duration}
          createdAt={createdAt}
          status={status}
          isEditingAnyTask={isEditingAnyTask}
          editingId={editingId}
          onDeleted={() => onDeleted(id)}
          onToggleTask={() => onToggleTask(id)}
          onEditTask={onEditTask}
          onTimerPlay={() => onTimerPlay(id)}
          onTimerStop={() => onTimerStop(id)}
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
