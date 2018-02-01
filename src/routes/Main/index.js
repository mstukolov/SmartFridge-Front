import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { LOGIN_PAGE } from "../../routes/constants";

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

    if (!token) {
      return <Redirect to={LOGIN_PAGE} />;
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="title" gutterBottom>
              Добро пожаловать, {token.name} {token.surname}!
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="subheading" gutterBottom>
              Описание продукта
            </Typography>
            <Typography>Вы находитесь в сервисе ...</Typography>
            <Typography>
              Воспользуйтесь главным меню, чтобы выбрать интересующую вас
              функцию.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default connect(state => ({
  token: state.auth.token
}))(withStyles(styles)(MainPage));
