import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Planagramm from "../../components/Planagramm/index";
import { connect } from "react-redux";
import { LOGIN_PAGE } from "../constants";
import { tokenSelector } from "../../ducks/Auth";
import { Redirect } from "react-router-dom";

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
  mapp: {
    padding: 16,
    height: "300px"
  }
});

/**
 * Страница контролья планограммы
 * @extends Component
 */
class PlanagrammPage extends Component {
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
      <Grid container spacing={24} alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="title" gutterBottom>
              Контроль планограммы
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Planagramm />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default connect(state => ({
  token: tokenSelector(state)
}))(withStyles(styles)(PlanagrammPage));
