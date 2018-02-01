import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import GlobalMap from "../../components/GlobalMap/index";
import { LOGIN_PAGE } from "../constants";
import { tokenSelector } from "../../ducks/Auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
    const { token } = this.props;
    const { classes } = this.props;

    if (!token) {
      return <Redirect to={LOGIN_PAGE} />;
    }
    return (
      <div className={classes.map}>
        <GlobalMap fullScreen={true} />
      </div>
    );
  }
}
export default connect(state => ({
  token: tokenSelector(state)
}))(withStyles(styles)(FullScreenMapPage));
