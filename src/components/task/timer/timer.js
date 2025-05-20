import "./timer.css";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const Timer = ({ date, onTimerPlay, onTimerStop, duration }) => {
  const [state, setState] = useState({
    date: date ? formatDistanceToNow(new Date(date), { includeSeconds: true }) : "Invalid date",
    timer: null,
  });

  useEffect(() => {
    const distanceDate = setInterval(() => {
      setState({
        date: date ? formatDistanceToNow(new Date(date), { includeSeconds: true }) : "Invalid date",
      });
    }, 1000);

    return () => clearInterval(distanceDate);
  }, []);

  const handlePlay = () => {
    onTimerPlay();
  };

  const handlePause = () => {
    onTimerStop();
  };

  const getTimeRemaining = (remaining) => {
    if (Number.isNaN(remaining)) return `00:00`;
    const min = Math.floor(remaining / 60);
    let sec = Math.floor(remaining % 60);
    if (sec < 10) sec = `0` + sec;
    return `${min}:${sec}`;
  };

  return (
    <React.Fragment>
      <span className="description">
        <button className="icon icon-play" onClick={handlePlay}></button>
        <button className="icon icon-pause" onClick={handlePause}></button>
        {getTimeRemaining(duration)}
      </span>
      <span className="description">{state.date}</span>
    </React.Fragment>
  );
};

Timer.defaultProps = {
  formatDistanceToNow: () => {},
  date: new Date(),
  duration: 600,
  onTimerPlay: () => {},
  onTimerStop: () => {},
};
Timer.propTypes = {
  formatDistanceToNow: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  duration: PropTypes.number,
  onTimerPlay: PropTypes.func,
  onTimerStop: PropTypes.func,
};

export default Timer;
