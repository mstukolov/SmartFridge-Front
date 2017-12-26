import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import green from "material-ui/colors/green";
import Button from "material-ui/Button";
import CheckIcon from "material-ui-icons/Check";
import SaveIcon from "material-ui-icons/Save";

const styles = theme => ({
  root: {
    display: "inline-flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class CircularSaveButton extends React.Component {
  state = {
    loading: false,
    success: false
  };

  render() {
    const { classes, success } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button fab color="primary" className={buttonClassname}>
            {this.props.success ? <CheckIcon /> : <SaveIcon />}
          </Button>
          {this.props.loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </div>
      </div>
    );
  }
}

CircularSaveButton.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool
};

export default withStyles(styles)(CircularSaveButton);
