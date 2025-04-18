import "./task-edit.css";
import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      inputRef: createRef(),
    };
  }

  componentDidUpdate() {
    if (this.props.status === "editing") {
      this.state.inputRef.current.focus();
    }
  }

  static defaultProps = {
    onSubmit: () => {},
    defaultValue: "",
    status: "",
  };

  static propTypes = {
    onSubmit: PropTypes.func,
    defaultValue: PropTypes.string,
    status: PropTypes.string,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const label = this.state.label === "" ? this.props.defaultValue : this.state.label;
    this.props.onSubmit(label);

    this.setState({
      label: "",
    }); // надо убрать - заметка пустеет при отправке без редактирования
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="edit"
          defaultValue={this.props.defaultValue}
          onChange={this.onLabelChange}
          ref={this.state.inputRef}
        />
      </form>
    );
  }
}
