import React, { Component } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import PhotoCameraIcon from "material-ui-icons/PhotoCamera";

const styles = theme => ({
  main: { textAlign: "center" },
  button: {
    margin: theme.spacing.unit
  }
});

class Shot extends Component {
  state = {
    shot: null
  };
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    this.setState({
      shot: imageSrc
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <div>
          <Button
            onClick={this.capture}
            fab
            color="primary"
            aria-label="add"
            className={classes.button}
          >
            <PhotoCameraIcon />
          </Button>
        </div>

        <div>
          <img src={this.state.shot} />
        </div>
      </div>
    );
  }
}

Shot.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Shot);
