/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import VisibilityIcon from "material-ui-icons/Visibility";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import FilterListIcon from "material-ui-icons/FilterList";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import { connect } from "react-redux";
import { deleteFridges, showFridge } from "../../AC";

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
    display: "flex"
  }
});

/**
 * Панель выбора значений (выпадает при клике на чекбокс)
 * @param {props} props
 * @return {ReactElement} разметка
 */

class EnhancedTableToolbar extends React.Component {
  /**
   * Функция обработки удаления списка выделленных элементов
   * @param  {SynteticEvent} ev React событие
   * @return {void}    [description]
   */
  handleDelete = ev => {
    ev.preventDefault();
    this.props.deleteFridges();
  };
  /**
   * Функция обработки редактирования списка выделленных элементов
   * @param  {SynteticEvent} ev React событие
   * @return {void}    [description]
   */
  handleEdit = ev => {
    ev.preventDefault();
    this.props.showFridge(true);
  };

  /**
   * Функция обработки просмотра списка выделленных элементов
   * @param  {SynteticEvent} ev React событие
   * @return {void}    [description]
   */
  handleShow = ev => {
    ev.preventDefault();
    this.props.showFridge(false);
  };

  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { numSelected, classes } = this.props;

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
              <Tooltip title="Просомотреть">
                <IconButton
                  disabled={numSelected > 1 ? true : false}
                  aria-label="Visibility"
                  onClick={this.handleShow}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Редактировать">
                <IconButton
                  aria-label="Edit"
                  disabled={numSelected > 1 ? true : false}
                  onClick={this.handleEdit}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить">
                <IconButton onClick={this.handleDelete} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Tooltip title="Фильтры">
              <IconButton aria-label="Фильтры">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      selected: state.fridges.selected,
      loading: state.fridges.isLoading,
      numSelected: state.fridges.selected.size,
      vocabulary: state.vocabulary
    };
  },
  {
    deleteFridges,
    showFridge
  }
)((EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)));
