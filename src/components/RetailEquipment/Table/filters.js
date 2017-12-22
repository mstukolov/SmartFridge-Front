import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  filterEquipmentByNetwork,
  filterEquipmentByPoint
} from "../../../ducks/RetailEquipment/table";
import { withStyles } from "material-ui/styles";
import {
  commercialNetworkSelector,
  tradePointSelector,
  filtersDataSelector
} from "../../../ducks/RetailEquipment/table";
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

/**
 * Компонент фильтров для таблицы
 * @extends React
 */
class RetailEquipmentTableFilters extends Component {
  state = {
    commercialNetwork: "",
    tradePoint: ""
  };

  /**
   * Обработка изменения значений выпадающего списка
   * @param {SytheticEvent} event    событие react
   * @return {void}
   */
  handleChangeNetwork = event => {
    this.setState({ commercialNetwork: event.target.value });
    // отправляем изменения параметров фильтрации в стор
    this.props.filterEquipmentByNetwork(event.target.value);
  };

  /**
   * Обработка изменения значений выпадающего списка
   * @param {SytheticEvent} event    событие react
   * @return {void}
   */
  handleChangePoint = event => {
    this.setState({ tradePoint: event.target.value });
    // отправляем изменения параметров фильтрации в стор
    this.props.filterEquipmentByPoint(event.target.value);
  };
  /**
   * Получаем значения селектов торговых сетей из стора
   * @return {ReactElement} разметка React
   */
  getNetworkItems = () => {
    return this.props.commercialNetwork.map(item => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };
  /**
   * Получаем значения селектов торговых точек из стора
   * @return {ReactElement} разметка React
   */
  getTradePoints = () => {
    try {
      const networkId = this.props.filters.commercialNetwork;
      const commercialNetworks = this.props.commercialNetwork;
      const commercialNetwork = commercialNetworks.find(
        item => item.id === networkId
      );

      return commercialNetwork.tradePoints.map(item => {
        const point = this.props.tradePoint.find(point => point.id === item);

        return (
          <MenuItem key={point.id} value={point.id}>
            {point.name}
          </MenuItem>
        );
      });
    } catch (e) {}
  };
  /**
   * render
   * @return {ReactElement} разметка React
   */
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
            onChange={this.handleChangeNetwork}
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
            onChange={this.handleChangePoint}
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
      filters: filtersDataSelector(state),
      commercialNetwork: commercialNetworkSelector(state),
      tradePoint: tradePointSelector(state)
    };
  },
  {
    filterEquipmentByNetwork,
    filterEquipmentByPoint
  }
)(
  (RetailEquipmentTableFilters = withStyles(styles)(
    RetailEquipmentTableFilters
  ))
);
