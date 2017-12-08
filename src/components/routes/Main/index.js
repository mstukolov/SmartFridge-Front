import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import AuthForm from "../../AuthForm/index";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 16,
    boxSizing: "border-box",
    textAlign: "center",
    height: "100%",
    color: theme.palette.text.secondary
  },
  mapp: {
    padding: 16,
    height: "300px"
  }
});

/**
 * Главная страница приложения
 * @extends Component
 */
class MainPage extends Component {
  /**
   * Создает разметку React
   * @return {ReactElement} разметка
   */
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="title" gutterBottom>
              Главная страница
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AuthForm />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MainPage);
