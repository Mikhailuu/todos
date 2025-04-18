import "./clear-completed.css";
import React from "react";
import PropTypes from "prop-types";

const ClearCompleted = ({ onClear }) => {
  return (
    <button className="clear-completed" onClick={onClear}>
      Clear completed
    </button>
  );
};
ClearCompleted.defaultProps = {
  onClear: () => {},
};

ClearCompleted.propTypes = {
  onClear: PropTypes.func,
};
export default ClearCompleted;
