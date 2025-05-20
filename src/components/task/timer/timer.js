import "./timer.css";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import PropTypes from "prop-types";
import React from "react";

const Timer = ({ createdAt, onTimerPlay, onTimerStop, duration }) => {
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
      <span className="description">
        {formatDistanceToNow(new Date(createdAt), {
          includeSeconds: true,
          addSuffix: true,
          locale: ru,
        })}
      </span>
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
