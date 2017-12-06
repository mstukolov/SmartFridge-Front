// @flow weak
import React from "react";
import { withStyles } from "material-ui/styles";
import { LinearProgress } from "material-ui/Progress";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

type Props = {
  classes: {
    root: string,
    test: string
  }
};

function LinearQuery(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress color="accent" mode="query" />
    </div>
  );
}

export default withStyles(styles)(LinearQuery);
