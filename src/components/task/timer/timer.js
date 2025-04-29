import "./timer.css";
import { formatDistanceToNow } from "date-fns";
import PropTypes, { string } from "prop-types";
import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date
        ? formatDistanceToNow(new Date(props.date), { includeSeconds: true })
        : "Invalid date",
      remaining: props.duration.min * 60 + Number.parseInt(props.duration.sec),
      isRunning: false,
    };
    this.timer = null;
  }

  static defaultProps = {
    formatDistanceToNow: () => {},
    date: new Date(),
    duration: {
      min: "",
      sec: "",
    },
  };

  static propTypes = {
    formatDistanceToNow: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    duration: PropTypes.shape({
      min: string,
      sec: string,
    }),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 30000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRunning && this.state.remaining > 0 && !prevState.isRunning) {
      this.play();
    } else if (this.state.remaining === 0 && prevState.remaining > 0) {
      this.stop();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: this.props.date
        ? formatDistanceToNow(new Date(this.props.date), { includeSeconds: true })
        : "Invalid date",
    });
  }

  play() {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ remaining: prevState.remaining - 1 }));
    }, 1000);
    this.setState({ isRunning: true });
  }

  stop() {
    this.clearTimer();
    this.setState({ isRunning: false });
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  handlePlay = () => {
    this.setState({
      isRunning: true,
    });
  };

  handlePause = () => {
    this.stop();
  };

  getTimeRemaining = (remaining) => {
    if (Number.isNaN(remaining)) return `00:00`;

    const min = Math.floor(remaining / 60);
    let sec = Math.floor(remaining % 60);
    if (sec < 10) sec = `0` + sec;

    return `${min}:${sec}`;
  };

  render() {
    return (
      <React.Fragment>
        <span className="description">
          <button className="icon icon-play" onClick={this.handlePlay}></button>
          <button className="icon icon-pause" onClick={this.handlePause}></button>
          {this.getTimeRemaining(this.state.remaining)}
        </span>
        <span className="description">{this.state.date}</span>
      </React.Fragment>
    );
  }
}
