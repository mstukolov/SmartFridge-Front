/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
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
    multiline:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  handleChange = name => event => {
    console.log("set", event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };

  getModels = () => {
    if (this.props.models)
      return this.props.models.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      });
    return null;
  };

  getTypes = () => {
    if (this.props.types)
      return this.props.types.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      });
    return null;
  };

  getFront = () => {
    if (this.props.front)
      return this.props.front.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      });
    return null;
  };

  isDisabledControl = () => {
    return true;
    // return !this.props.edit;
  };

  render() {
    const { classes, fridge, models, types, front } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <FormControl
          disabled={this.isDisabledControl()}
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="model">Модель</InputLabel>
          <Select
            value={models[fridge.model].id}
            onChange={this.handleChange(this.name)}
            input={<Input name="model" id="model" />}
            autoWidth
          >
            {this.getModels()}
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <TextField
          id="full-width"
          label="Серийный номер"
          value={fridge.serial}
          disabled={this.isDisabledControl()}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Cерийный номер"
          helperText="15 символов"
          fullWidth
          margin="normal"
        />

        <FormControl
          disabled={this.isDisabledControl()}
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="type">Тип</InputLabel>
          <Select
            value={types[fridge.type].id}
            onChange={this.handleChange(this.name)}
            input={<Input name="type" id="type" />}
            autoWidth
          >
            {this.getTypes()}
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <FormControl
          disabled={this.isDisabledControl()}
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="model">Тип фронтальной части</InputLabel>
          <Select
            value={front[fridge.front].id}
            onChange={this.handleChange(this.name)}
            input={<Input name="model" id="model" />}
            autoWidth
          >
            {this.getFront()}
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <TextField
          id="full-width"
          label="Комплектность"
          value={fridge.completeness}
          disabled={this.isDisabledControl()}
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
          value={fridge.cost}
          disabled={this.isDisabledControl()}
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
          value={fridge.location}
          disabled={this.isDisabledControl()}
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
          disabled={this.isDisabledControl()}
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

  componentDidMount() {}
}

DeviceForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(state => {
  const { edit } = state.fridgeForm;
  const { models, types, front } = state.vocabulary;
  const fridge = state.fridges.selected.first();
  // TODO: Переделать организацию хранения данных в сторэдж
  const storageItem = JSON.parse(localStorage.getItem("activeItem"));
  return {
    fridge: fridge || storageItem,
    models,
    types,
    front
  };
}, {})(withStyles(styles)(DeviceForm));
