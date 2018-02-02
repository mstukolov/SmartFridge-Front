import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import GlobalMap from "../../components/GlobalMap/index";
import { connect } from "react-redux";
import { tokenSelector } from "../../ducks/Auth";
import { LOGIN_PAGE } from "../constants";
import { Redirect } from "react-router-dom";
import {
  loadAll as loadLocation,
  loadingSelector,
  markerSelector
} from "../../ducks/RetailEquipment/location";
import { callAll as loadEquipment } from "../../ducks/RetailEquipment/equipment";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 16,
    boxSizing: "border-box",
    height: "100%",
    color: theme.palette.text.secondary
  },
  map: {
    height: "calc(100vh - 271px)"
  }
});

/**
 * Главная страница приложения
 * @extends Component
 */
class MapPage extends Component {
  /**
   * Создает разметку React
   * @return {ReactElement} разметка
   */
  render() {
    const { classes, items, loading, token } = this.props;

    if (!token) {
      return <Redirect to={LOGIN_PAGE} />;
    }
    return (
      <Grid container spacing={24} alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="title" gutterBottom>
              Устройства на карте
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div className={classes.map}>
              <GlobalMap items={items} loading={loading} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  /**
   * Делаем запрос с сервера
   * @return {void}
   */
  componentDidMount() {
    this.props.loadEquipment();
    this.props.loadLocation();
  }
}

export default connect(
  state => ({
    token: tokenSelector(state),
    items: markerSelector(state),
    loading: loadingSelector(state)
  }),
  { loadLocation, loadEquipment }
)(withStyles(styles)(MapPage));
