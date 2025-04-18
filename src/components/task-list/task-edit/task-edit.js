import "./task-edit.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
    };
  }

  static defaultProps = {
    onSubmit: () => {},
    defaultValue: "",
  };

  static propTypes = {
    onSubmit: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.label);

    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="edit"
          defaultValue={this.props.defaultValue}
          onChange={this.onLabelChange}
        />
      </form>
    );
  }
}
