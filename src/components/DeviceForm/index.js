/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import TextField from "material-ui/TextField";

import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";

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
  }
});

class DeviceForm extends React.Component {
  state = {
    model: "10",
    serial: "",
    multiline:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  handleChange = name => event => {
    console.log("set", event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="model">Модель</InputLabel>
          <Select
            value={this.state.model}
            onChange={this.handleChange(this.name)}
            input={<Input name="model" id="model" />}
            autoWidth
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <TextField
          id="full-width"
          label="Серийный номер"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Cерийный номер"
          helperText="15 символов"
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="model">Тип</InputLabel>
          <Select
            value={this.state.model}
            onChange={this.handleChange(this.name)}
            input={<Input name="model" id="model" />}
            autoWidth
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="model">Тип фронтальной части</InputLabel>
          <Select
            value={this.state.model}
            onChange={this.handleChange(this.name)}
            input={<Input name="model" id="model" />}
            autoWidth
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <TextField
          id="full-width"
          label="Комплектность"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Комплектность"
          helperText="15 символов"
          fullWidth
          margin="normal"
        />

        <TextField
          id="full-width"
          label="Стоимость"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Стоимость"
          helperText="15 символов"
          fullWidth
          margin="normal"
        />

        <TextField
          id="full-width"
          label="Локация"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Локация"
          helperText="10 символов"
          fullWidth
          margin="normal"
        />

        <TextField
          fullWidth
          id="multiline-flexible"
          label="Дополниельная информация"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange("multiline")}
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

DeviceForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeviceForm);
