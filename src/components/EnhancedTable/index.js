/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from "react";
// import classNames from "classnames";
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
  callAllFridges,
  selectFridge,
  selectAllFridges,
  sortOrderBy,
  deleteFridges,
  writeFridges,
  showFridges
} from "../../AC";
import LinearQuery from "../LinearQuery";
import Moment from "react-moment";
import { orderedRowsSelector } from "../../selectors";
import EnhancedTableHead from "./head";
import EnhancedTableToolbar from "./toolbar";

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
  },
  preloader: {
    height: "5px"
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
    this.props.selectAllFridges();
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
    this.props.selectFridge(item);
  };

  /**
   * Переключение страницы в пагинации таблицы
   * @param  {SynteticEvent} event событие react
   * @param  {Number} page         номер страницы
   * @return {void}
   */
  handleChangePage = (event, page) => {
    this.setState({ page });
    localStorage.setItem("page", page);
  };
  /**
   * Устанавливает колличество отображаемых строк на странице
   * @param  {SynteticEvent} event событие react
   * @return {void}
   */
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    localStorage.setItem("rowsPerPage", +event.target.value);
  };
  /**
   * Проверяет, выбрана ли текущая строка
   * @param  {String}  id идентификатор текущей строки
   * @return {Boolean}
   */
  isSelected = id => this.props.selected.has(id);

  /**
   * Делаем запрос всех устройств с сервера и настроек просмотра из  storage
   * @return {void}
   */
  componentDidMount() {
    if (!this.props.data.length) this.props.callAllFridges();
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
  getDataPreloader() {
    return this.props.loading ? <LinearQuery /> : null;
  }

  /**
   * Поулчаем из словаяря читабельный эквивалент id
   * @param  {String} type тип поля
   * @param  {String} id   значение
   * @return {String}      читаемое значение
   */
  getVocabularyNameById = (type, id) => {
    return this.props.vocabulary[type][id].name;
  };

  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const {
      order,
      orderBy,
      data,
      classes,
      selected,
      deleteFridges,
      writeFridges,
      showFridges
    } = this.props;
    const { rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.size}
          deleteList={deleteFridges}
          writeList={writeFridges}
          visibilityList={showFridges}
        />
        <div className={classes.tableWrapper}>
          <div className={classes.preloader}>{this.getDataPreloader()}</div>

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
                      <TableCell padding="none">
                        {this.getVocabularyNameById("models", n.model)}
                      </TableCell>
                      <TableCell numeric>{n.serial}</TableCell>
                      <TableCell numeric>
                        {this.getVocabularyNameById("types", n.type)}
                      </TableCell>
                      <TableCell numeric>
                        {this.getVocabularyNameById("front", n.front)}
                      </TableCell>
                      <TableCell numeric>{n.completeness}</TableCell>
                      <TableCell numeric>{n.cost}</TableCell>
                      <TableCell numeric>{n.location}</TableCell>
                      <TableCell numeric>
                        <Moment>{n.date}</Moment>
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

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      data: orderedRowsSelector(state),
      selected: state.fridges.selected,
      loading: state.fridges.isLoading,
      order: state.filters.orderData.get("order"),
      orderBy: state.filters.orderData.get("orderBy"),
      vocabulary: state.vocabulary
    };
  },
  {
    callAllFridges,
    selectFridge,
    selectAllFridges,
    sortOrderBy,
    deleteFridges,
    writeFridges,
    showFridges
  }
)(withStyles(styles)(EnhancedTable));
