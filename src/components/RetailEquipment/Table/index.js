/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import FileDownload from "material-ui-icons/FileDownload";
import Button from "material-ui/Button";
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
  callAll,
  selectEquipment,
  selectAllEquipment,
  sortOrderBy,
  chainsSelector,
  storesSelector,
  orderedFilterRowsSelector,
  CSVdataSelector
} from "../../../ducks/RetailEquipment/equipment";
import { loadAll as loadAllChains } from "../../../ducks/RetailEquipment/chains";
import { loadAll as loadAllStores } from "../../../ducks/RetailEquipment/stores";
import LinearQuery from "../../LinearQuery/index";
import RetailEquipmentTableHead from "./head";
import RetailEquipmentTableToolbar from "./toolbar";
import SimpleSnackbar from "../../SimpleSnackbar/index";
import TrendingUpIcon from "material-ui-icons/TrendingUp";
import TrendingDownIcon from "material-ui-icons/TrendingDown";
import TrendingFlatIcon from "material-ui-icons/TrendingFlat";
import red from "material-ui/colors/red";
import green from "material-ui/colors/green";
import { CSVLink } from "react-csv";

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
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  buttonSet: {
    padding: "16px"
  },
  csv: {
    textDecoration: "none"
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
      rowsPerPage: 5,
      intervalRequestId: null
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
   * @return {void}
   */
  handleSelectAllClick = () => {
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
      this.handleClick(event, item.Requipid);
    }
  };
  /**
   * Обработка клика, устанавливает/снимает выделение строки
   * @param  {SynteticEvent} event событие react
   * @param  {String} id           идентификатор
   * @return {void}
   */
  handleClick = (event, id) => {
    event.preventDefault();
    this.props.selectEquipment(id);
  };

  /**
   * Переключение страницы в пагинации таблицы
   * @param  {SynteticEvent} event событие react
   * @param  {Number} page         номер страницы
   * @return {void}
   */
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  /**
   * Устанавливает колличество отображаемых строк на странице
   * @param  {SynteticEvent} event событие react
   * @return {void}
   */
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  /**
   * Проверяет, выбрана ли текущая строка
   * @param  {String}  id идентификатор текущей строки
   * @return {Boolean}
   */
  isSelected = id => {
    return this.props.selected.indexOf(id) >= 0;
  };

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
    this.props.callAll();

    const id = setInterval(() => {
      this.props.callAll();
    }, 10000);

    this.props.loadAllChains();
    this.props.loadAllStores();

    this.setState({
      intervalRequestId: id
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalRequestId);
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
  getVocabularyNameByRequipid = (type, id) => {
    const lib = this.props.vocabulary.get(type);

    return type && id && lib ? lib.get(id) : "Значение не определено";
  };

  /**
   * Создает индикацию пополнения
   * @param filling текущее заполнение
   * @param lastValue предыдущее значение заполнения
   * @return {ReactElement} разметка иконки
   */
  getUpdateIcon = (filling, lastValue) => {
    const { classes } = this.props;
    const result = filling - lastValue;
    if (result > 0) {
      return <TrendingUpIcon className={classes.refillIconUp} />;
    }
    if (result < 0) {
      return <TrendingDownIcon className={classes.refillIconDown} />;
    }

    return <TrendingFlatIcon />;
  };

  /**
   * Выводит дату
   * @param dateString
   * @returns {ReactElement} разметка
   */
  getUpdateDate = dateString => {
    try {
      const date = new Date(dateString);

      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric"
      };

      return <div>{date.toLocaleString("ru", options)}</div>;
    } catch (e) {
      console.error("Ошибка парсинга даты", e);
    }
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
                  const isSelected = this.isSelected(n.Requipid);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.Requipid)}
                      onKeyDown={event => this.handleKeyDown(event, n.Requipid)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.Requipid}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>

                      <TableCell padding="none">
                        {n.Requipserialnumber}
                      </TableCell>

                      <TableCell padding="none">
                        Адрес
                        {/*{n.Requipserialnumber}*/}
                      </TableCell>

                      <TableCell numeric>{n.Requipfullness}%</TableCell>

                      <TableCell padding="checkbox">
                        {this.getUpdateIcon(
                          n.Requipfullness,
                          n.Requiplastvalue
                        )}
                      </TableCell>

                      <TableCell padding="none">{n.Rchainname}</TableCell>

                      <TableCell>{n.Storename}</TableCell>

                      <TableCell numeric>
                        {this.getUpdateDate(n.Measuredate)}
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
        <div className={classes.buttonSet}>
          <CSVLink className={classes.csv} data={this.props.CSVdata}>
            <Button raised color="default">
              Скачать в CSV
              <FileDownload className={classes.rightIcon} />
            </Button>
          </CSVLink>
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
      CSVdata: CSVdataSelector(state),
      data: orderedFilterRowsSelector(state),
      networks: chainsSelector(state),
      points: storesSelector(state),
      selected: state.equipment.selected,
      loading: state.equipment.loading,
      order: state.equipment.orderData.get("order"),
      orderBy: state.equipment.orderData.get("orderBy"),
      error: state.equipment.error
    };
  },
  {
    callAll,
    loadAllChains,
    loadAllStores,
    selectEquipment,
    selectAllEquipment,
    sortOrderBy
  }
)(withStyles(styles)(RetailEquipmentTable));
