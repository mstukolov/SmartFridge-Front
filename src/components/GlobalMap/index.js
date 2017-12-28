import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { Map, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { connect } from "react-redux";
import { loadAll } from "../../ducks/RetailEquipment/location";
import redMarker from "./redMarker";
import getStringPopup from "./popup";
import history from "../../redux/history";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import FullScreenIcon from "material-ui-icons/Fullscreen";
import FullScreenExitIcon from "material-ui-icons/FullscreenExit";

const styles = theme => ({
  button: {
    position: "absolute",
    left: theme.spacing.unit,
    bottom: theme.spacing.unit,
    zIndex: 1000
  }
});

/**
 * Компонент карты
 * @extends Component
 */
class GlobalMap extends React.Component {
  state = {
    mapCenterCoordinates: [55.6331614, 37.362987],
    mapZoom: 4,
    mapMaxZoom: 18,
    fullScreen: false
  };

  constructor(props) {
    super(props);
  }
  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { classes } = this.props;
    const { mapCenterCoordinates, mapZoom, mapMaxZoom } = this.state;
    let cls = classNames({
      "markercluster-map": true,
      fullScreenLeaflet: this.state.fullScreen
    });
    return (
      <Map
        className={cls}
        center={mapCenterCoordinates}
        zoom={mapZoom}
        maxZoom={mapMaxZoom}
      >
        <Button
          fab
          color="primary"
          aria-label="add"
          onClick={this.toGgleFullScreen}
          className={classes.button}
        >
          {this.state.fullScreen ? <FullScreenExitIcon /> : <FullScreenIcon />}
        </Button>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <MarkerClusterGroup markers={this.props.items.toArray()} />
      </Map>
    );
  }

  /**
   * Переключает в полноэкранный режим и назад
   * @param ev
   * @return {void}
   */
  toGgleFullScreen = ev => {
    ev.preventDefault();

    this.setState({ fullScreen: !this.state.fullScreen });
  };

  /**
   * Устанавливает карту с параметрами
   * @param lat {Number} широта
   * @param lng {Number} долгота
   * @param {Number} zoom приближение
   * @return {void}
   */
  setCenterPosition = (lat = 55.6331614, lng = 37.362987, zoom = 4) => {
    this.setState({
      mapCenterCoordinates: [lat, lng],
      mapZoom: zoom
    });
  };

  /**
   * Делаем запрос с сервера
   * @return {void}
   */
  componentDidMount() {
    this.props.loadAll();
  }
  /**
   * При наличии активной точки, устанавливает ее параметры в состояние
   * @param  {Object} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { activeMapItemId } = nextProps;
    if (activeMapItemId) {
      const item = nextProps.items.get(activeMapItemId);

      this.setCenterPosition(item.position[0], item.position[1], 8);
    }
  }
}

GlobalMap.propTypes = {
  classes: PropTypes.object.isRequired
};
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
      activeMapItemId = history.location.pathname.split(":")[1];
    }

    return {
      items,
      activeMapItemId
    };
  },
  { loadAll }
)(withStyles(styles)(GlobalMap));
