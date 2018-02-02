/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "material-ui/Table";
import Checkbox from "material-ui/Checkbox";
import Tooltip from "material-ui/Tooltip";

/**
 * Набор данных для заголовков таблицы
 * @type {Array}
 */
const columnData = [
  {
    id: "Requipserialnumber",
    numeric: false,
    disablePadding: true,
    label: "Серийный номер"
  },
  {
    id: "Requipfullness",
    numeric: true,
    disablePadding: false,
    label: "Наполнение"
  },

  {
    id: "refill",
    numeric: false,
    disablePadding: true,
    label: "Пополнение"
  },

  {
    id: "chains",
    numeric: false,
    disablePadding: true,
    label: "Торговая сеть"
  },

  {
    id: "stores",
    numeric: false,
    disablePadding: false,
    label: "Торговая точка"
  },

  {
    id: "Sensorvalue",
    numeric: false,
    disablePadding: true,
    label: "Вес"
  },

  {
    id: "Updatedat",
    numeric: false,
    disablePadding: false,
    label: "Время измерения"
  }
];

/**
 * Компонент шапки таблицы
 * @extends React
 */
export default class RetailEquipmentTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  };

  static defaultProps = {
    rowCount: 0
  };
  /**
   * Обработчик сортировки в шапке таблицы
   * @param  {String} property поле сортировки
   * @param  {SytheticEvent} event
   * @return {void}
   */
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  /**
   * render
   * @return {ReactElement} разметка компонента React
   */
  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
              >
                <Tooltip
                  title="Сортировка"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
