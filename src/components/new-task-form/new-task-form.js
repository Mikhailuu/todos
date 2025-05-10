import "./new-task-form.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      min: "",
      sec: "",
    };
  }

  static defaultProps = {
    onAddItem: () => {},
  };

  static propTypes = {
    onAddItem: PropTypes.func,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.label !== "")
      this.props.onAddItem(this.state.label, this.state.min * 60 + Number(this.state.sec), false);

    this.setState({
      label: "",
      min: "",
      sec: "",
    });
  };

  onKeyDown = (event) => {
    if (event.key === "Enter") {
      this.onSubmit(event);
    }
  };
  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.onKeyDown}>
        <input
          type="text"
          className="new-todo"
          name="label"
          placeholder="Task"
          autoFocus
          onChange={(e) => this.onChange(e)}
          value={this.state.label}
        />
        <input
          type="text"
          inputMode="numeric"
          min="0"
          className="new-todo-form__timer"
          name="min"
          placeholder="Min"
          autoFocus
          onChange={(e) => this.onChange(e)}
          value={this.state.min}
        />
        <input
          type="text"
          inputMode="numeric"
          min="0"
          className="new-todo-form__timer"
          name="sec"
          placeholder="Sec"
          autoFocus
          onChange={(e) => this.onChange(e)}
          value={this.state.sec}
        />
      </form>
    );
  }
}
