/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import keycode from "keycode";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "material-ui/Table";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import DeleteIcon from "material-ui-icons/Delete";
import FilterListIcon from "material-ui-icons/FilterList";
import { connect } from "react-redux";
import { callAllFridges, selectFridge, selectAllFridges } from "../../AC";
import { mapToArray } from "../../utils";
import LinearQuery from "../LinearQuery";

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
class EnhancedTableHead extends React.Component {
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
   */
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  /**
   * render
   * @return {ReactElement} разметка
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
  }
});

/**
 * Панель выбора значений (выпадает при клике на чекбокс)
 * @param {[type]} props
 * @return {ReactElement} разметка
 */
let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

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
          <Tooltip title="Удалить">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%"
    // marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 800
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

/**
 * Компонент таблицы
 * @extends React
 */
class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 5
    };
  }
  /**
   * Функция сортировки по алфавиту
   * @param  {SytheticEvent} event    событие react
   * @param  {String} property        признак сортировки
   * @return {ReactElement}           разметка
   */
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  /**
   * Выбор всех строк оборудования
   * @param  {SytheticEvent} event    событие react
   * @param  {Boolean} checked        признак выбора всех пунктов
   */
  handleSelectAllClick = (event, checked) => {
    this.props.selectAllFridges();
  };
  /**
   * Управление с клавиатуры, клик при помощи пробела
   * @param  {SynteticEvent} event событие react
   * @param  {String} id           идентификатор
   */
  handleKeyDown = (event, id) => {
    if (keycode(event) === "space") {
      this.handleClick(event, id);
    }
  };
  /**
   * Обработка клика, устанавливает/снимает выделение строки
   * @param  {SynteticEvent} event событие react
   * @param  {String} id           идентификатор
   */
  handleClick = (event, id) => {
    this.props.selectFridge(id);
  };

  /**
   * Переключение страницы в пагинации таблицы
   * @param  {SynteticEvent} event событие react
   * @param  {Number} page         номер страницы
   */
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  /**
   * Устанавливает колличество отображаемых строк на странице
   * @param  {SynteticEvent} event событие react
   */
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  /**
   * Проверяет, выбрана ли текущая строка
   * @param  {String}  id идентификатор текущей строки
   * @return {Boolean}
   */
  isSelected = id => this.props.selected.has(id);

  /**
   * Делаем запрос всех устройств с сервера
   */
  componentDidMount() {
    this.props.callAllFridges();
  }

  /**
   * Индикация загрузки данных
   * @return {ReactElement} разметка прелоадера
   */
  getDataPreloader() {
    return this.props.loading ? <LinearQuery /> : null;
  }

  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { data, classes, selected } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.size} />
        <div className={classes.tableWrapper}>
          {this.getDataPreloader()}
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.size}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />

            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      onKeyDown={event => this.handleKeyDown(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell padding="none">{n.model}</TableCell>
                      <TableCell numeric>{n.serial}</TableCell>
                      <TableCell numeric>{n.type}</TableCell>
                      <TableCell numeric>{n.front}</TableCell>
                      <TableCell numeric>{n.completeness}</TableCell>
                      <TableCell numeric>{n.cost}</TableCell>
                      <TableCell numeric>{n.location}</TableCell>
                      <TableCell numeric>{n.date.toString()}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      data: state.fridges.collection,
      selected: state.fridges.selected,
      loading: state.fridges.isLoading
    };
  },
  { callAllFridges, selectFridge, selectAllFridges }
)(withStyles(styles)(EnhancedTable));
