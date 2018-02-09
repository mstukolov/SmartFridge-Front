import React, { Component } from "react";
// import Webcam from "react-webcam";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
// import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import PhotoCameraIcon from "material-ui-icons/PhotoCamera";

import { connect } from "react-redux";
import {
  locationSelector,
  saveLocation,
  saveFileData
} from "../../ducks/Planagramm";

import addPhotoIcon from "./ic_add_a_photo_black_24px.svg";

const styles = theme => ({
  main: { textAlign: "center" },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  preview: {
    height: "320px",
    margin: "auto",
    position: "relative",
    width: "320px",
    "&:before": {
      background: `url(${addPhotoIcon})  no-repeat`,
      backgroundSize: "cover",
      content: '""',
      display: "block",
      height: "100%",
      left: 0,
      opacity: ".2",
      position: "absolute",
      top: 0,
      width: "100%"
    },
    "&:hover:before": {
      opacity: ".4"
    },
    "&:active:before": {
      opacity: ".6"
    }
  },
  prewImg: {
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%"
  }
});

class Shot extends Component {
  state = {
    shot: null
  };
  // setRef = webcam => {
  //   this.webcam = webcam;
  // };

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

  // capture = () => {
  //   const imageSrc = this.webcam.getScreenshot();
  //   console.log(this.getLocation());
  //   this.setState({
  //     shot: imageSrc,
  //   });
  // };

  takePhoto = event => {
    this.getLocation();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.setState({
          shot: e.target.result
        });
        this.props.saveFileData(file);
      };

      reader.readAsDataURL(file);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div className={classes.preview}>
          <label htmlFor="icon-button-file">
            <img
              className={classes.prewImg}
              width={"100%"}
              height={"100%"}
              src={this.state.shot}
              alt="Фото витрины"
            />
          </label>
        </div>

        {/*<Webcam*/}
        {/*audio={false}*/}
        {/*height={350}*/}
        {/*ref={this.setRef}*/}
        {/*screenshotFormat="image/jpeg"*/}
        {/*width={350}*/}
        {/*/>*/}
        <div>
          {/*<Button*/}
          {/*onClick={this.capture}*/}
          {/*fab*/}
          {/*color="primary"*/}
          {/*aria-label="add"*/}
          {/*className={classes.button}*/}
          {/*>*/}
          {/*<PhotoCameraIcon />*/}
          {/*</Button>*/}

          <input
            accept="image/*"
            onChange={this.takePhoto}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              className={classes.button}
              component="span"
            >
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>

        <div>
          {/*<img src={shot} />*/}
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
  { saveLocation, saveFileData }
)(withStyles(styles)(Shot));
