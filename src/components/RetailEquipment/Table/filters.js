import React, { Component } from "react";
import { connect } from "react-redux";
import {
  filterByNetwork,
  filterByPoint
} from "../../../ducks/RetailEquipment/equipment";
import { filterStores } from "../../../ducks/RetailEquipment/stores";
import { withStyles } from "material-ui/styles";
import { filtersDataSelector } from "../../../ducks/RetailEquipment/equipment";
import { storesSelector } from "../../../ducks/RetailEquipment/stores";
import { chainsSelector } from "../../../ducks/RetailEquipment/chains";
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
    chain: "",
    store: ""
  };

  /**
   * Обработка изменения значений выпадающего списка
   * @param {SytheticEvent} event    событие react
   * @return {voId}
   */
  handleChangeNetwork = event => {
    this.setState({ chain: event.target.value });
    this.props.filterStores(event.target.value);
    // отправляем изменения параметров фильтрации в стор
    this.props.filterByNetwork(event.target.value);
  };

  /**
   * Обработка изменения значений выпадающего списка
   * @param {SytheticEvent} event    событие react
   * @return {voId}
   */
  handleChangePoint = event => {
    this.setState({ store: event.target.value });
    // отправляем изменения параметров фильтрации в стор
    this.props.filterByPoint(event.target.value);
  };
  /**
   * Получаем значения селектов торговых сетей из стора
   * @return {ReactElement} разметка React
   */
  getNetworkItems = () => {
    return this.props.chain.map(item => {
      return (
        <MenuItem key={item.Id} value={item.Id}>
          {item.Name}
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
      return this.props.store.map(item => {
        const point = item;

        return (
          <MenuItem key={point.Id} value={point.Id}>
            {point.Name}
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
          <InputLabel htmlFor="chain-simple">Торговая сеть</InputLabel>
          <Select
            value={this.state.chain}
            onChange={this.handleChangeNetwork}
            input={<Input name="chain" id="chain-simple" />}
          >
            <MenuItem value="">
              <em>Нет</em>
            </MenuItem>
            {this.getNetworkItems()}
          </Select>
        </FormControl>

        <FormControl
          className={classes.formControl}
          disabled={!this.state.chain}
        >
          <InputLabel htmlFor="stores-simple">Торговая точка</InputLabel>
          <Select
            value={this.state.store}
            onChange={this.handleChangePoint}
            input={<Input name="store" id="stores-simple" />}
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

export default connect(
  state => {
    return {
      filters: filtersDataSelector(state),
      chain: chainsSelector(state),
      store: storesSelector(state)
    };
  },
  {
    filterByNetwork,
    filterByPoint,
    filterStores
  }
)(
  (RetailEquipmentTableFilters = withStyles(styles)(
    RetailEquipmentTableFilters
  ))
);
