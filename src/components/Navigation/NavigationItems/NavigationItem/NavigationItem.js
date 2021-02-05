import React from "react";

import classes from "./NavigationItem.module.css";
import PropTypes from "prop-types";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <a className={props.active ? classes.active : null} href={props.link}>
        {props.children}
      </a>
    </li>
  );
};

navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
};

export default navigationItem;
