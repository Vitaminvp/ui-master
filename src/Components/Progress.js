import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ value, total }) => (
  <div className="progressWrapper">
    <Progress indicating value={value} total={total} size="medium" />
  </div>
);

export default ProgressBar;
