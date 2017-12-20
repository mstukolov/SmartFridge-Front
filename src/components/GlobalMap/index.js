import React from "react";
import "./index.css";
import { Map, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { connect } from "react-redux";
import { loadAll } from "../../ducks/RetailEquipment/location";
import redMarker from "./redMarker";
import getStringPopup from "./popup";

class GlobalMap extends React.Component {
  state = {
    mapCenterCoordinates: [55.6331614, 37.362987],
    mapZoom: 4,
    mapMaxZoom: 18
  };

  render() {
    const { mapCenterCoordinates, mapZoom, mapMaxZoom } = this.state;

    return (
      <Map
        className="markercluster-map"
        center={mapCenterCoordinates}
        zoom={mapZoom}
        maxZoom={mapMaxZoom}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <MarkerClusterGroup markers={this.props.items.toArray()} />
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

  componentWillReceiveProps(nextProps) {
    const { activeMapItemId } = nextProps;
    if (activeMapItemId) {
      const item = nextProps.items.get(activeMapItemId);

      this.setState({
        mapCenterCoordinates: [item.position[0], item.position[1]],
        mapZoom: 8
      });
    }
  }
}

export default connect(
  state => {
    // Наносим маркеры на карту
    const items = state.equipmentLocation.get("collection").map(item => {
      let element = {
        position: [item.lat, item.lng],
        popup: getStringPopup(item.id)
      };
      // Если в списке выбранных точек есть данная, выделяем ее красным маркером
      if (state.equipment.selected.get(item.id)) {
        element.options = { icon: redMarker };
      }
      return element;
    });

    // Получаем активный маркер по id
    let activeMapItemId = null;

    if (state.equipment.selected.size) {
      activeMapItemId = state.equipment.selected.keySeq().first();
    }

    return {
      items,
      activeMapItemId
    };
  },
  { loadAll }
)(GlobalMap);
