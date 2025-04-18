import "./todo-count.css";
import React from "react";
import PropTypes from "prop-types";

const TodoCount = ({ count }) => {
  return <span className="todo-count">{`${count} items left`}</span>;
};

TodoCount.defaultProps = {
  count: 0,
};

TodoCount.defaultProps = {
  count: PropTypes.number,
};

TodoCount.defaultProps = {
  count: 0,
};
TodoCount.propTypes = {
  count: PropTypes.number,
};

export default TodoCount;
