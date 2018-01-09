/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import keycode from "keycode";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import { connect } from "react-redux";
import {
  callAllEquipment,
  selectEquipment,
  selectAllEquipment,
  sortOrderBy,
  commercialNetworkSelector,
  tradePointSelector,
  orderedFilterRowsSelector
} from "../../../ducks/RetailEquipment/equipment";
import LinearQuery from "../../LinearQuery/index";
import Moment from "react-moment";
import RetailEquipmentTableHead from "./head";
import RetailEquipmentTableToolbar from "./toolbar";
import SimpleSnackbar from "../../SimpleSnackbar/index";
import TrendingUpIcon from "material-ui-icons/TrendingUp";
import TrendingDownIcon from "material-ui-icons/TrendingDown";
import red from "material-ui/colors/red";
import green from "material-ui/colors/green";
import { getName } from "../../../utils";

const styles = theme => ({
  root: {
    // maxWidth: 900,
    margin: "auto"
  },
  table: {
    // minWidth: 600,
    //   maxWidth: 800
  },
  tableWrapper: {
    overflowX: "auto"
  },
  preloader: {
    height: "5px"
  },
  refillIconUp: {
    color: green[500]
  },
  refillIconDown: {
    color: red[500]
  }
});

/**
 * Компонент таблицы
 * @extends React
 */
class RetailEquipmentTable extends React.Component {
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
   * @return {void}
   */
  handleRequestSort = (event, property) => {
    this.props.sortOrderBy(property);
  };

  /**
   * Выбор всех строк оборудования
   * @param  {SytheticEvent} event    событие react
   * @param  {Boolean} checked        признак выбора всех пунктов
   * @return {void}
   */
  handleSelectAllClick = (event, checked) => {
    this.props.selectAllEquipment();
  };
  /**
   * Управление с клавиатуры, клик при помощи пробела
   * @param  {SynteticEvent} event событие react
   * @param  {String} id           идентификатор
   * @return {void}
   */
  handleKeyDown = (event, item) => {
    event.preventDefault();
    if (keycode(event) === "space") {
      this.handleClick(event, item);
    }
  };
  /**
   * Обработка клика, устанавливает/снимает выделение строки
   * @param  {SynteticEvent} event событие react
   * @param  {String} id           идентификатор
   * @return {void}
   */
  handleClick = (event, item) => {
    event.preventDefault();
    this.props.selectEquipment(item);
  };

  /**
   * Переключение страницы в пагинации таблицы
   * @param  {SynteticEvent} event событие react
   * @param  {Number} page         номер страницы
   * @return {void}
   */
  handleChangePage = (event, page) => {
    this.setState({ page });
    // TODO: Переделать организацию хранения данных в сторэдж
    localStorage.setItem("page", page);
  };
  /**
   * Устанавливает колличество отображаемых строк на странице
   * @param  {SynteticEvent} event событие react
   * @return {void}
   */
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    // TODO: Переделать организацию хранения данных в сторэдж
    localStorage.setItem("rowsPerPage", +event.target.value);
  };
  /**
   * Проверяет, выбрана ли текущая строка
   * @param  {String}  id идентификатор текущей строки
   * @return {Boolean}
   */
  isSelected = id => this.props.selected.has(id);

  /**
   * Показывает нотификатор с текстом ошибки
   * @returns {*}
   */
  showError = () => {
    if (!this.props.error) return;
    return <SimpleSnackbar text={this.props.error.message} />;
  };

  /**
   * Делаем запрос всех устройств с сервера и настроек просмотра из  storage
   * @return {void}
   */
  componentDidMount() {
    if (!this.props.data.length) this.props.callAllEquipment();
    // TODO: Переделать организацию хранения данных в сторэдж
    const rowsPerPage = localStorage.getItem("rowsPerPage");
    const page = localStorage.getItem("page");
    if (rowsPerPage)
      this.setState({
        rowsPerPage: +rowsPerPage
      });

    if (page)
      this.setState({
        page: +page
      });
  }

  /**
   * Индикация загрузки данных
   * @return {ReactElement} разметка прелоадера
   */
  showLoading() {
    return this.props.loading ? <LinearQuery /> : null;
  }

  /**
   * Поулчаем из словаяря читабельный эквивалент id
   * @param  {String} type тип поля
   * @param  {String} id   значение
   * @return {String}      читаемое значение
   */
  getVocabularyNameById = (type, id) => {
    const lib = this.props.vocabulary.get(type);

    return type && id && lib ? lib.get(id) : "Значение не определено";
  };

  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { order, orderBy, data, classes } = this.props;

    const { rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        {this.showError()}
        <RetailEquipmentTableToolbar />
        <div className={classes.tableWrapper}>
          <div className={classes.preloader}>{this.showLoading()}</div>

          <Table className={classes.table}>
            <RetailEquipmentTableHead
              numSelected={this.props.selected.size}
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
                      onClick={event => this.handleClick(event, n)}
                      onKeyDown={event => this.handleKeyDown(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>

                      <TableCell padding="none">{n.serialNumber}</TableCell>

                      <TableCell numeric>{n.remain}%</TableCell>

                      <TableCell padding="checkbox">
                        {n.refill ? (
                          <TrendingUpIcon className={classes.refillIconUp} />
                        ) : (
                          <TrendingDownIcon
                            className={classes.refillIconDown}
                          />
                        )}
                      </TableCell>

                      <TableCell>
                        {getName(n.commercialNetwork, this.props.networks)}
                      </TableCell>

                      <TableCell padding="none">
                        {getName(n.tradePoint, this.props.points)}
                      </TableCell>

                      <TableCell numeric>
                        <Moment format="DD/MM/YYYY HH:MM">
                          {n.dateUpdate}
                        </Moment>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                {this.props.loading ? null : (
                  <TablePagination
                    labelRowsPerPage="Показывыать на странице:"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} из ${count}`
                    }
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                )}
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

RetailEquipmentTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      data: orderedFilterRowsSelector(state),
      networks: commercialNetworkSelector(state),
      points: tradePointSelector(state),
      selected: state.equipment.selected,
      loading: state.equipment.loading,
      order: state.equipment.orderData.get("order"),
      orderBy: state.equipment.orderData.get("orderBy"),
      error: state.equipment.error
    };
  },
  {
    callAllEquipment,
    selectEquipment,
    selectAllEquipment,
    sortOrderBy
  }
)(withStyles(styles)(RetailEquipmentTable));
