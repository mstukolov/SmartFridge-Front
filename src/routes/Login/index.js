/* eslint-disable flowtype/require-valid-file-annotation */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SimpleSnackbar from "../../components/SimpleSnackbar";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Send from "material-ui-icons/Send";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

import {
  tokenSelector,
  errorSelector,
  authorizeAction
} from "../../ducks/Auth";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  paper: {
    padding: 16,
    boxSizing: "border-box",
    height: "100%",
    color: theme.palette.text.secondary
  }
});

class LoginPage extends PureComponent {
  state = { login: "", password: "" };

  onChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { login, password } = this.state;
    this.props.dispatch(authorizeAction(login, password));
  };

  showError = err => {
    return this.props.error ? <SimpleSnackbar text={err} /> : null;
  };

  render() {
    const { error, token } = this.props;
    const { classes } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="title" gutterBottom>
                Добро пожаловать!
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="headline" component="h3">
                Авторизация
              </Typography>
              <form className={classes.container} noValidate autoComplete="off">
                {this.showError(this.props.error)}

                <TextField
                  id="name"
                  name="login"
                  label="Введите логин"
                  className={classes.textField}
                  value={this.state.login}
                  onChange={this.onChange}
                  margin="normal"
                />
                <TextField
                  name="password"
                  id="password"
                  label="Введите пароль"
                  className={classes.textField}
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  autoComplete="current-password"
                  margin="normal"
                />
                <Button
                  onClick={this.onSubmit}
                  className={classes.button}
                  raised
                  color="primary"
                >
                  Авторизоваться
                  <Send className={classes.rightIcon} />
                </Button>

                {/*<p>Login: {this.state.login}</p>*/}
                {/*<p>Password: {this.state.password}</p>*/}
                {/*<p>Error: {this.state.error}</p>*/}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(state => ({
  token: tokenSelector(state),
  error: errorSelector(state)
}))(withStyles(styles)(LoginPage));
