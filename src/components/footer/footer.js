import "./footer.css";
import TodoCount from "./todo-count";
import TaskFilter from "./task-filter";
import ClearCompleted from "./clear-completed";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Footer extends Component {
  static defaultProps = {
    count: 0,
    onFilterItems: () => {},
    onClearCompleted: () => {},
  };

  static propTypes = {
    count: PropTypes.number,
    onFilterItems: PropTypes.func,
    onClearCompleted: PropTypes.func,
  };

  render() {
    const count = this.props.count;
    const onFilterItems = this.props.onFilterItems;
    const onClearCompleted = this.props.onClearCompleted;

    return (
      <footer className="footer">
        <TodoCount count={count} />
        <TaskFilter onFiltered={onFilterItems} />
        <ClearCompleted onClear={onClearCompleted} />
      </footer>
    );
  }
}
