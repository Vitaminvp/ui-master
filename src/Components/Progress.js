import React from "react";
import { Progress } from "semantic-ui-react";
import PropTypes from "prop-types";

const ProgressBar = ({ percent }) => (
  <div className="progressWrapper">
    <Progress indicating  size="medium" percent={percent} />
  </div>
);


ProgressBar.propTypes = {
    percent: PropTypes.number.isRequired,
};


export default ProgressBar;
