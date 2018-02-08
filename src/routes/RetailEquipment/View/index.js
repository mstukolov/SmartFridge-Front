// @flow weak
import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import GlobalMap from "../../../components/GlobalMap/index";
import Typography from "material-ui/Typography";
import RetailMoreInfo from "../../../components/RetailEquipment/Form/index";
import { connect } from "react-redux";
import { tokenSelector } from "../../../ducks/Auth";
import { LOGIN_PAGE } from "../../constants";
import { Redirect } from "react-router-dom";
import {
  loadAll as loadLocation,
  loadingSelector,
  markerSelector
} from "../../../ducks/RetailEquipment/location";
import { callAll as loadEquipment } from "../../../ducks/RetailEquipment/equipment";

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
    width: "100%",
    height: "100%"
  }
});

class RetailEquipmentPageView extends Component {
  render() {
    const { classes, token, items, activeItem, loading } = this.props;
    if (!token) {
      return <Redirect to={LOGIN_PAGE} />;
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={24} alignItems="stretch">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="title" gutterBottom>
                Информация об оборудовании
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <RetailMoreInfo location={this.props.location.pathname} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.map}>
              {activeItem ? (
                <GlobalMap
                  items={items}
                  loading={loading}
                  centerCoordinates={[activeItem.lat, activeItem.lng]}
                  zoom={18}
                />
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </div>
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
  state => {
    return {
      token: tokenSelector(state),
      activeItem: state.moreInfo.activeItem,
      items: markerSelector(state),
      loading: loadingSelector(state)
    };
  },
  { loadLocation, loadEquipment }
)(withStyles(styles)(RetailEquipmentPageView));
