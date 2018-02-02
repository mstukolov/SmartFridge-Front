/* eslint-disable flowtype/require-valid-file-annotation */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import { LOGIN_PAGE } from "../../routes/constants";

import { tokenSelector } from "../../ducks/Auth";

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

class UserProfilePage extends PureComponent {
  state = { login: "", password: "" };
  render() {
    const { token } = this.props;
    const { classes } = this.props;

    if (!token) {
      return <Redirect to={LOGIN_PAGE} />;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="title" gutterBottom>
                Профиль пользователя
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="subheading">Имя: {token.name}</Typography>
              <Typography type="subheading">
                Фамилия: {token.surname}
              </Typography>
              {/*<Typography type="subheading">*/}
              {/*Должность: Главнокомандующий*/}
              {/*</Typography>*/}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(state => ({
  token: tokenSelector(state)
}))(withStyles(styles)(UserProfilePage));
