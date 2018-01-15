/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import DeleteIcon from "material-ui-icons/Delete";
import MapIcon from "material-ui-icons/Map";
import InsertCahrtIcon from "material-ui-icons/InsertChart";
import VisibilityIcon from "material-ui-icons/Visibility";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import FilterListIcon from "material-ui-icons/FilterList";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import { connect } from "react-redux";
import {
  deleteEquipment,
  showMoreInfo,
  showReport
} from "../../../ducks/RetailEquipment/equipment";
import { Link } from "react-router-dom";
import { RouteMapPage } from "../../../routes/constants";
import RetailEquipmentTableFilters from "./filters";

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100
        }
      : {
          color: theme.palette.secondary.A100,
          backgroundColor: theme.palette.secondary.A700
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },

  flex: {
    display: "flex",
    alignItems: "center"
  }
});

/**
 * Панель выбора значений (выпадает при клике на чекбокс)
 * @param {props} props
 * @return {ReactElement} разметка
 */

class RetailEquipmentTableToolbar extends React.Component {
  state = {
    showFilters: false
  };
  /**
   * Функция обработки удаления списка выделленных элементов
   * @param  {SynteticEvent} ev React событие
   * @return {void}    [description]
   */
  handleDelete = ev => {
    ev.preventDefault();
    this.props.deleteEquipment(this.props.selected);
  };

  /**
   * Функция просмотра выделенного элемента
   * @param  {SynteticEvent} ev React событие
   * @return {void}    [description]
   */
  handleShowFullInfo = ev => {
    this.props.showMoreInfo(this.props.selected.keySeq().first());
  };

  /**
   * Функция построения графика для выделленного элемента
   * @param  {SynteticEvent} ev React событие
   * @return {void}    [description]
   */
  handleShowReport = ev => {
    this.props.showReport(this.props.selected.keySeq().first());
  };
  /**
   * Блокирует клик по кнопке просмотра/редактирования
   * @param  {SynteticEvent} ev React событие
   * @return {void}
   */
  // handleEdit = ev => {
  //   this.props.editEquipment(this.props.selected.first()["id"]);
  // };
  /**
   * Блокирует клик по кнопке просмотра/редактирования
   * @param  {SynteticEvent} ev React событие
   * @return {void}
   */
  toggleFilters = ev => {
    ev.preventDefault();
    this.setState({ showFilters: !this.state.showFilters });
  };
  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { numSelected, classes, loading } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography type="subheading">
              Выбрано устройств: {numSelected}
            </Typography>
          ) : (
            <Typography type="title">Устройства</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div className={classes.flex}>
              <Tooltip title="Просомотреть подробную информацию">
                <div>
                  <IconButton
                    onClick={this.handleShowFullInfo}
                    disabled={numSelected > 1}
                    aria-label="Visibility"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Построить графики">
                <IconButton
                  onClick={this.handleShowReport}
                  disabled={numSelected > 1}
                  aria-label="Show report"
                >
                  <InsertCahrtIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Просомотреть на карте">
                <Link to={RouteMapPage}>
                  <IconButton aria-label="Visibility on map">
                    <MapIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Удалить">
                <IconButton onClick={this.handleDelete} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div className={classes.flex}>
              {this.state.showFilters ? <RetailEquipmentTableFilters /> : null}
              <Tooltip title="Фильтры">
                <IconButton
                  disabled={loading}
                  onClick={this.toggleFilters}
                  aria-label="Фильтры"
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </Toolbar>
    );
  }
}

RetailEquipmentTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      selected: state.equipment.selected,
      loading: state.equipment.loading,
      numSelected: state.equipment.selected.size
    };
  },
  {
    deleteEquipment,
    showMoreInfo,
    showReport
  }
)(
  (RetailEquipmentTableToolbar = withStyles(toolbarStyles)(
    RetailEquipmentTableToolbar
  ))
);
