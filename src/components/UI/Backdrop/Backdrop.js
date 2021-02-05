import React from "react";

import PropTypes from "prop-types";
import classes from "./Backdrop.module.css";

const backdrop = (props) => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;
};

backdrop.propTypes = {
  show: PropTypes.bool,
};

export default backdrop;
