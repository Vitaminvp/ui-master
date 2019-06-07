import React from "react";
import { Button } from "semantic-ui-react";

const ButtonPlay = ({ icon, onButtonClick }) => (
  <Button icon={icon} onClick={onButtonClick} />
);

export default ButtonPlay;
