import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <BuildControl label="Cheese" />
    </div>
  );
};

export default buildControls;
