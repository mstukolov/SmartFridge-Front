import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import PropTypes from "prop-types";
import { Map, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import history from "../../redux/history";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import FullScreenIcon from "material-ui-icons/Fullscreen";
import FullScreenExitIcon from "material-ui-icons/FullscreenExit";
import { FULL_SCREEN_MAP_PAGE, MAP_PAGE } from "../../routes/constants";
import BlockingPreloader from "../BlockingPreloader";

const styles = theme => ({
  main: {
    height: "100%"
  },
  button: {
    top: theme.spacing.unit,
    right: theme.spacing.unit,
    position: "absolute",
    zIndex: 1000
  }
});

/**
 * Компонент карты
 * @extends Component
 */
class GlobalMap extends React.Component {
  state = {
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
    const { centerCoordinates, zoom, maxZoom } = this.props;
    let cls = classNames({
      "markercluster-map": true,
      [classes.main]: true,
      fullScreenLeaflet: this.state.fullScreen
    });
    return (
      <Map
        className={cls}
        center={centerCoordinates}
        zoom={zoom}
        maxZoom={maxZoom}
      >
        {this.props.loading ? <BlockingPreloader /> : ""}
        <Button
          fab
          color="primary"
          aria-label="add"
          onClick={this.toGgleFullScreen}
          className={classes.button}
        >
          {this.props.fullScreen ? <FullScreenExitIcon /> : <FullScreenIcon />}
        </Button>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <MarkerClusterGroup markers={this.props.items} />
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
    if (this.props.fullScreen) {
      history.push(MAP_PAGE);
    } else {
      history.push(FULL_SCREEN_MAP_PAGE);
    }

    this.setState({ fullScreen: !this.state.fullScreen });
  };
}

GlobalMap.defaultProps = {
  centerCoordinates: [55.6331614, 37.362987],
  zoom: 10,
  maxZoom: 18
};

GlobalMap.propTypes = {
  classes: PropTypes.object.isRequired,
  centerCoordinates: PropTypes.array,
  maxZoom: PropTypes.number,
  zoom: PropTypes.number,
  items: PropTypes.array,
  loading: PropTypes.bool
};

export default withStyles(styles)(GlobalMap);
