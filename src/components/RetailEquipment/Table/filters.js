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
    commercialNetworks: "",
    tradePoints: ""
  };

  handleChange = event => {
    console.log({ [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
    this.props.filterEquipment({ [event.target.name]: event.target.value });
  };

  getNetworkItems = () => {
    return this.props.commercialNetworks.map(item => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  getTradePoints = () => {
    return this.props.tradePoints.map(item => {
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
          <InputLabel htmlFor="commercialNetworks-simple">
            Торговая сеть
          </InputLabel>
          <Select
            value={this.state.commercialNetworks}
            onChange={this.handleChange}
            input={
              <Input name="commercialNetworks" id="commercialNetworks-simple" />
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
          disabled={!this.state.commercialNetworks.length}
        >
          <InputLabel htmlFor="tradePoints-simple">Торговая точка</InputLabel>
          <Select
            value={this.state.tradePoints}
            onChange={this.handleChange}
            input={<Input name="tradePoints" id="tradePoints-simple" />}
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
      commercialNetworks: state.equipment.commercialNetworks.toArray(),
      tradePoints: state.equipment.tradePoints.toArray()
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
