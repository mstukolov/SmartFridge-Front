import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
  container: {
    alignItems: "center",
    background: "rgba(0,0,0,.2)",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1001
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

function BlockingPreloader(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} size={50} />
    </div>
  );
}

BlockingPreloader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BlockingPreloader);
