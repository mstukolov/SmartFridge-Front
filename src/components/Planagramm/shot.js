import React, { Component } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import PhotoCameraIcon from "material-ui-icons/PhotoCamera";
import { connect } from "react-redux";
import { locationSelector, saveLocation } from "../../ducks/Planagramm";

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

  getLocation = () => {
    const options = {
      enableHighAccuracy: true
    };

    const success = pos => {
      let crd = pos.coords;
      this.props.saveLocation({
        latitude: crd.latitude,
        longitude: crd.longitude,
        accuracy: crd.accuracy
      });
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(this.getLocation());
    this.setState({
      shot: imageSrc
    });

    // this.setState({
    //   location: this.getLocation(),
    // });
  };

  render() {
    const { classes } = this.props;
    const { shot } = this.state;
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
          <img src={shot} />
          <p>latitude: {this.props.location.latitude}</p>
          <p>longitude: {this.props.location.longitude}</p>
          <p>accuracy: {this.props.location.accuracy}</p>
        </div>
      </div>
    );
  }
}

Shot.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      location: locationSelector(state)
    };
  },
  { saveLocation }
)(withStyles(styles)(Shot));
