import React from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const ButtonPlay = ({ icon, onButtonClick }) => (
  <Button icon={icon} onClick={onButtonClick} />
);

ButtonPlay.propTypes = {
    icon: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired,
};

export default ButtonPlay;
