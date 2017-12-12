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
    id: "model",
    numeric: false,
    disablePadding: true,
    label: "Модель"
  },
  {
    id: "serial",
    numeric: true,
    disablePadding: false,
    label: "Серийный номер"
  },
  { id: "type", numeric: true, disablePadding: false, label: "Тип" },
  {
    id: "front",
    numeric: true,
    disablePadding: false,
    label: "Тип фронтальной панели"
  },
  {
    id: "completeness",
    numeric: true,
    disablePadding: false,
    label: "Комплектность"
  },
  {
    id: "cost",
    numeric: true,
    disablePadding: false,
    label: "Стоимость"
  },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Локация"
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Дата"
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
