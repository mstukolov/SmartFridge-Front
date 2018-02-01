import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";

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
 * Главная страница приложения
 * @extends Component
 */
class MainPage extends Component {
  /**
   * Создает разметку React
   * @return {ReactElement} разметка
   */
  render() {
    const { classes, token } = this.props;
    // return (
    //   <Grid container spacing={24}>
    //     <Grid item xs={12}>
    //       <Paper className={classes.paper}>
    //         <Typography type="title" gutterBottom>
    //           Главная страница
    //         </Typography>
    //       </Paper>
    //     </Grid>
    //
    //     <Grid item xs={12}>
    //       <Paper className={classes.paper}>
    //       </Paper>
    //     </Grid>
    //   </Grid>
    // );

    if (!token) {
      return <Redirect to="/login" />;
    }

    return <div> You are logged in.</div>;
  }
}

export default connect(state => ({
  token: state.auth.token
}))(withStyles(styles)(MainPage));
