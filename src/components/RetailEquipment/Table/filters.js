import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { filterEquipment } from "../../../ducks/RetailEquipment/table";
import { withStyles } from "material-ui/styles";

import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";

const styles = theme => ({
  container: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class RetailEquipmentTableFilters extends Component {
  state = {
    commercialNetwork: "",
    tradePoint: ""
  };

  handleChange = event => {
    console.log({ [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
    this.props.filterEquipment({ [event.target.name]: event.target.value });
  };

  getNetworkItems = () => {
    return this.props.commercialNetwork.map(item => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  getTradePoints = () => {
    return this.props.tradePoint.map(item => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="commercialNetwork-simple">
            Торговая сеть
          </InputLabel>
          <Select
            value={this.state.commercialNetwork}
            onChange={this.handleChange}
            input={
              <Input name="commercialNetwork" id="commercialNetwork-simple" />
            }
          >
            <MenuItem value="">
              <em>Нет</em>
            </MenuItem>
            {this.getNetworkItems()}
          </Select>
        </FormControl>

        <FormControl
          className={classes.formControl}
          disabled={!this.state.commercialNetwork.length}
        >
          <InputLabel htmlFor="tradePoint-simple">Торговая точка</InputLabel>
          <Select
            value={this.state.tradePoint}
            onChange={this.handleChange}
            input={<Input name="tradePoint" id="tradePoint-simple" />}
          >
            <MenuItem value="">
              <em>Нет</em>
            </MenuItem>
            {this.getTradePoints()}
          </Select>
        </FormControl>
      </form>
    );
  }
}

RetailEquipmentTableFilters.propTypes = {};
RetailEquipmentTableFilters.defaultProps = {};

export default connect(
  state => {
    return {
      commercialNetwork: state.equipment.commercialNetwork.toArray(),
      tradePoint: state.equipment.tradePoint.toArray()
    };
  },
  {
    filterEquipment
  }
)(
  (RetailEquipmentTableFilters = withStyles(styles)(
    RetailEquipmentTableFilters
  ))
);
