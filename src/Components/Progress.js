import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ percent }) => (
  <div className="progressWrapper">
    <Progress indicating  size="medium" percent={percent} />
  </div>
);

export default ProgressBar;
