import React from "react";
import "./index.css";
import { Map, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { connect } from "react-redux";
import { loadAll } from "../../ducks/RetailEquipment/location";

class GlobalMap extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    itmes: []
  };

  render() {
    const MAP_CENTER_COORDINATES = [51.0, 19.0];
    const MAP_ZOOM = 4;
    const MAP_MAX_ZOOM = 18;
    // const markers = [
    //   { position: [50.4501, 30.5234] },
    //   {
    //     position: [52.2297, 21.0122],
    //     options: { title: "Warszawa title on hover" },
    //   },
    //   { position: [50.0647, 19.945] },
    //   {
    //     position: [48.9226, 24.7111],
    //     options: { title: "San Frankivsko title on hover" },
    //   },
    //   { position: [48.7164, 21.2611] },
    // ];
    return (
      <Map
        className="markercluster-map"
        center={MAP_CENTER_COORDINATES}
        zoom={MAP_ZOOM}
        maxZoom={MAP_MAX_ZOOM}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <MarkerClusterGroup markers={this.props.items} />
      </Map>
    );
  }

  /**
   * Делаем запрос с сервера
   * @return {void}
   */
  componentDidMount() {
    this.props.loadAll();
  }
}

export default connect(
  state => {
    const items = state.equipmentLocation.collection.map(item => {
      return { position: [item.lat, item.lng] };
    });
    console.log(items.toJS());
    return {
      items: items.toJS()
    };
  },
  { loadAll }
)(GlobalMap);
