/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "material-ui/TextField";
import Send from "material-ui-icons/Send";
import Button from "material-ui/Button";

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
  }
});

class AuthForm extends React.Component {
  state = {
    name: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Введите логин"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
        />

        <TextField
          id="password"
          label="Введите пароль"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />

        <Button className={classes.button} raised color="primary">
          Отправить
          <Send className={classes.rightIcon} />
        </Button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthForm);
