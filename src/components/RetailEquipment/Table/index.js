/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React, { Component } from "react";
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
import red from "material-ui/colors/red";
import green from "material-ui/colors/green";
import { CSVLink } from "react-csv";
import classNames from "classnames";

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
  },
  fullnessEmpty: {
    color: red[500],
    fontWeight: 600
  },
  fullnessFull: {
    color: green[500],
    fontWeight: 600
  }
});

/**
 * Компонент таблицы
 * @extends React
 */
class RetailEquipmentTable extends Component {
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
   * Создает разметку для колонки уведомлений
   * @param filling текущее заполнение
   * @return {ReactElement}
   */
  getUpdateIcon = filling => {
    if (+filling <= 30) {
      return "Требуется пополнение";
    }

    return null;
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
                  const sn = n.Requipserialnumber;
                  const id = n.Requipid;
                  const addr = "Адрес";
                  const fullness = n.Requipfullness;
                  const updateIcon = this.getUpdateIcon(
                    n.Requipfullness,
                    n.Requiplastvalue
                  );
                  const chain = n.Rchainname;
                  const store = n.Storename;
                  const date = this.getUpdateDate(n.Measuredate);
                  const fullnessClassname = classNames({
                    [classes.fullnessFull]: +fullness > 30,
                    [classes.fullnessEmpty]: +fullness <= 30
                  });

                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.Requipid)}
                      onKeyDown={event => this.handleKeyDown(event, n.Requipid)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>

                      <TableCell padding="none">{sn}</TableCell>

                      <TableCell padding="none">{addr}</TableCell>

                      <TableCell padding="none" className={fullnessClassname}>
                        {fullness + "%"}
                      </TableCell>

                      <TableCell padding="none">{updateIcon}</TableCell>

                      <TableCell padding="none">{chain}</TableCell>

                      <TableCell padding="none">{store}</TableCell>

                      <TableCell padding="none">{date}</TableCell>
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
