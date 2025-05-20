import "./task-filter.css";
import React from "react";
import PropTypes from "prop-types";

const TaskFilter = ({ onFiltered }) => {
  const filterChange = (e) => {
    onFiltered(e.target.name);
  };

  return (
    <ul className="filters">
      <li className="selected">
        <button name="all" onClick={filterChange}>
          All
        </button>
      </li>
      <li>
        <button name="active" onClick={filterChange}>
          Active
        </button>
      </li>
      <li>
        <button name="completed" onClick={filterChange}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.defaultProps = {
  onFiltered: () => {},
};
TaskFilter.propTypes = {
  onFiltered: PropTypes.func,
};

export default TaskFilter;
