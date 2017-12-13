import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class SimpleMap extends Component {
  static defaultProps = {
    center: { lat: 55.63, lng: 37.36 },
    zoom: 11
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={55.6329564}
          lng={37.3631287}
          text={"Kreyser Avrora"}
        />
      </GoogleMapReact>
    );
  }
}
