// @flow weak
import React, { Component } from "react";
import RetailEquipmentTable from "../../../components/RetailEquipment/Table/index";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { connect } from "react-redux";
import { LOGIN_PAGE } from "../../constants";
import { Redirect } from "react-router-dom";
import { tokenSelector } from "../../../ducks/Auth";

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
    padding: 16,
    height: "300px"
  }
});

/**
 * Страница с табличным представление данных
 * @extends Component
 */
class RetailEquipmentPageMain extends Component {
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
      <div className={classes.root}>
        <Grid container spacing={24} alignItems="stretch">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="title" gutterBottom>
                Торговое оборудование
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <RetailEquipmentTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(state => ({
  token: tokenSelector(state)
}))(withStyles(styles)(RetailEquipmentPageMain));
