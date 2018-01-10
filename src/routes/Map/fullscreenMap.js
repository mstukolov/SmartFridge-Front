import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import GlobalMap from "../../components/GlobalMap/index";

const styles = theme => ({
  map: {
    zIndex: 10000,
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw"
  }
});

/**
 * Главная страница приложения
 * @extends Component
 */
class FullScreenMapPage extends Component {
  /**
   * Создает разметку React
   * @return {ReactElement} разметка
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.map}>
        <GlobalMap fullScreen={true} />
      </div>
    );
  }
}

export default withStyles(styles)(FullScreenMapPage);
