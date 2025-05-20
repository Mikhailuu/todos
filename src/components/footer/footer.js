import "./footer.css";
import TodoCount from "./todo-count";
import TaskFilter from "./task-filter";
import ClearCompleted from "./clear-completed";
import React from "react";
import PropTypes from "prop-types";

const Footer = ({ count, onFilterItems, onClearCompleted }) => {
  return (
    <footer className="footer">
      <TodoCount count={count} />
      <TaskFilter onFiltered={onFilterItems} />
      <ClearCompleted onClear={onClearCompleted} />
    </footer>
  );
};

Footer.defaultProps = {
  count: 0,
  onFilterItems: () => {},
  onClearCompleted: () => {},
};
Footer.propTypes = {
  count: PropTypes.number,
  onFilterItems: PropTypes.func,
  onClearCompleted: PropTypes.func,
};

export default Footer;
