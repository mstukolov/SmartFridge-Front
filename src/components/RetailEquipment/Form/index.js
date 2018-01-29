/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FormControl from "material-ui/Form/FormControl";
import FormHelperText from "material-ui/Form/FormHelperText";
import Button from "material-ui/Button";
import {
  cancelEquipment,
  editEquipment,
  showMoreInfo,
  loadEquipment,
  saveEditEquipment
} from "../../../ducks/RetailEquipment/moreInfo";
import {
  ChainSelector,
  StoreSelector
} from "../../../ducks/RetailEquipment/equipment";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import SimpleSnackbar from "../../SimpleSnackbar";
import LinearQuery from "../../LinearQuery/index";
import CircularSaveButton from "../../CircularSaveButton";
import moment from "moment";
import TrendingUpIcon from "material-ui-icons/TrendingUp";
import TrendingDownIcon from "material-ui-icons/TrendingDown";
import TrendingFlatIcon from "material-ui-icons/TrendingFlat";
import red from "material-ui/colors/red";
import green from "material-ui/colors/green";
import Tooltip from "material-ui/Tooltip";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },

  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  buttonSet: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  lineLoader: {
    position: "absolute",
    top: "-10px",
    height: "5px",
    width: "100%"
  },
  refillIconUp: {
    color: green[500]
  },
  refillIconDown: {
    color: red[500]
  },
  text: {
    display: "block",
    marginBottom: "8px",
    marginTop: "16px",
    width: "100%",
    "& > span": {
      color: "#000",
      padding: "6px 0"
    }
  },
  updateIcon: {
    width: "100%"
  }
});

/**
 * Компонент формы просмотра/редактирования оборудования
 * @extends React
 */
class RetailMoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Address: "Данные отсутствуют",
      Chain: "Данные отсутствуют",
      Filling: "Данные отсутствуют",
      Id: "Данные отсутствуют",
      Lastvalue: "Данные отсутствуют",
      Lat: "Данные отсутствуют",
      Lng: "Данные отсутствуют",
      Maxvalue: "Данные отсутствуют",
      Serialnumber: "Данные отсутствуют",
      Store: "Данные отсутствуют"
    };
  }

  /**
   * Функция обработки изменений занчения поля
   * @param name имя поля
   * @returns {void}
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  /**
   * Индикация загрузки данных
   * @return {ReactElement} разметка прелоадера
   */
  showLoading() {
    return this.props.loading ? <LinearQuery /> : null;
  }

  /**
   * Проверяет блокировать ли контролы
   * @returns {boolean}
   */
  isDisabledControl = () => {
    return !this.props.edit;
  };

  /**
   * Обработка клика по кнопке отмены
   * {SynteticEvent} ev событие react
   */
  handleBtnBackClick = ev => {
    ev.preventDefault();
    this.props.cancelEquipment();
  };

  /**
   * Создает набор кнопок для управления формой
   * @returns {ReactElement}
   */
  getButtonSet = () => {
    if (this.props.error || this.props.loading) return null;
    const { classes } = this.props;
    const btns =
      this.props.edit || this.props.saving ? (
        <div onClick={this.handleSubmit}>
          <CircularSaveButton
            loading={this.props.saving}
            // success={this.props.saved}
          />
        </div>
      ) : (
        <div onClick={this.handleBtnEditClick}>
          <Button
            fab
            color="primary"
            aria-label="edit"
            className={classes.button}
          >
            <ModeEditIcon />
          </Button>
        </div>
      );
    return (
      <div className={classes.buttonSet}>
        <Button
          onClick={this.handleBtnBackClick}
          className={classes.button}
          raised
          color="accent"
        >
          Вернуться назад
        </Button>

        {btns}
      </div>
    );
  };

  /**
   * Обработка клика по кнопке редактирования записи
   * {SynteticEvent} ev событие react
   */
  handleBtnEditClick = ev => {
    ev.preventDefault();
    this.props.editEquipment();
  };

  /**
   * Делаем запрос устройства с сервера
   * @return {void}
   */
  componentDidMount() {
    this.props.loadEquipment(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fridge) {
      const {
        Address,
        Chain,
        Filling,
        Id,
        Lastvalue,
        Lat,
        Lng,
        Maxvalue,
        Serialnumber,
        Store
      } = nextProps.fridge;

      this.setState({
        Address,
        Chain,
        Filling,
        Id,
        Lastvalue,
        Lat,
        Lng,
        Maxvalue,
        Serialnumber,
        Store
      });
    }
  }

  /**
   * Обработка отправки формы
   * @param ev
   */
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.saveEditEquipment(this.state);
    this.props.showMoreInfo();
    console.log("submit -->", this.state);
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
   * Показывает нотификатор успешной отправки данных на сервер
   * @returns {*}
   */
  showSuccessSaved = () => {
    if (!this.props.saved) return;
    return <SimpleSnackbar text="Данные сохранены" />;
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
      return (
        <Tooltip
          id="tooltip-icon"
          title="Остаток пополнился"
          placement="bottom"
        >
          <TrendingUpIcon
            style={{
              width: 48,
              height: 48
            }}
            className={classes.refillIconUp}
          />
        </Tooltip>
      );
    }
    if (result < 0) {
      return (
        <Tooltip
          id="tooltip-icon"
          title="Остаток уменьшился"
          placement="bottom"
        >
          <TrendingDownIcon
            style={{
              width: 48,
              height: 48
            }}
            className={classes.refillIconDown}
          />
        </Tooltip>
      );
    }

    return (
      <Tooltip
        id="tooltip-icon"
        title="Остаток не изменился"
        placement="bottom"
      >
        <TrendingFlatIcon
          style={{
            width: 48,
            height: 48
          }}
        />
      </Tooltip>
    );
  };

  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { classes, edit } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <div className={classes.lineLoader}>{this.showLoading()}</div>

        {this.showError()}
        {this.showSuccessSaved()}

        {edit ? (
          <TextField
            id="full-width"
            label="Серийный номер"
            onChange={this.handleChange("Serialnumber")}
            name={"serial"}
            value={this.state.Serialnumber}
            disabled={this.isDisabledControl()}
            InputLabelProps={{
              shrink: true
            }}
            placeholder=""
            helperText="15 символов"
            fullWidth
            margin="normal"
          />
        ) : (
          <FormControl className={classes.text}>
            <FormHelperText>Серийный номер</FormHelperText>
            <span className={classes.text}>{this.state.Serialnumber}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Торговая сеть"
            onChange={this.handleChange("Chain")}
            name={"network"}
            value={this.state.Chain}
            disabled={this.isDisabledControl()}
            InputLabelProps={{
              shrink: true
            }}
            placeholder=""
            helperText="15 символов"
            fullWidth
            margin="normal"
          />
        ) : (
          <FormControl className={classes.text}>
            <FormHelperText>Торговая сеть</FormHelperText>
            <span className={classes.text}>{this.state.Chain}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Торговая точка"
            // onChange={this.handleChange("Chain")}
            // name={"serial"}
            value={this.state.Store}
            disabled={this.isDisabledControl()}
            InputLabelProps={{
              shrink: true
            }}
            placeholder=""
            helperText="15 символов"
            fullWidth
            margin="normal"
          />
        ) : (
          <FormControl className={classes.text}>
            <FormHelperText>Торговая точка</FormHelperText>
            <span className={classes.text}>{this.state.Store}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Максимальный вес"
            value={this.state.Maxvalue}
            onChange={this.handleChange("Maxvalue")}
            disabled={this.isDisabledControl()}
            InputLabelProps={{
              shrink: true
            }}
            placeholder=""
            helperText="%"
            fullWidth
            margin="normal"
          />
        ) : (
          <FormControl className={classes.text}>
            <FormHelperText>Максимальный вес</FormHelperText>
            <span className={classes.text}>{this.state.Maxvalue}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Текущий вес"
            value={this.state.Filling}
            onChange={this.handleChange("Filling")}
            disabled={this.isDisabledControl()}
            InputLabelProps={{
              shrink: true
            }}
            placeholder=""
            helperText="%"
            fullWidth
            margin="normal"
          />
        ) : (
          <FormControl className={classes.text}>
            <FormHelperText>Текущий вес</FormHelperText>
            <span className={classes.text}>{this.state.Filling}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="datetime-local"
            label="Последнее измерение"
            type="datetime-local"
            defaultValue={moment(this.state.dateUpdate).format(
              "YYYY-MM-DDThh:mm"
            )}
            disabled={this.isDisabledControl()}
            InputLabelProps={{
              shrink: true
            }}
          />
        ) : (
          <FormControl>
            <FormHelperText>Последнее измерение</FormHelperText>
            <span className={classes.text}>
              {moment(this.state.dateUpdate).format("YYYY.MM.DD hh:mm")}
            </span>
          </FormControl>
        )}
        <div className={classes.updateIcon}>
          {this.getUpdateIcon(this.state.Filling, this.state.Lastvalue)}
        </div>

        {edit ? (
          <TextField
            fullWidth
            id="multiline-flexible"
            label="Дополниельная информация"
            disabled={this.isDisabledControl()}
            multiline
            rowsMax="4"
            onChange={this.handleChange("additionalInformation")}
          />
        ) : (
          <FormControl className={classes.text}>
            <FormHelperText>Дополниельная информация</FormHelperText>
            <span className={classes.text}>{}</span>
          </FormControl>
        )}

        {this.getButtonSet()}
      </form>
    );
  }
}

RetailMoreInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired
};

export default connect(
  state => {
    const edit = state.moreInfo.get("edit");

    return {
      // networks: ChainSelector(state),
      // points: StoreSelector(state),
      fridge: state.moreInfo.activeItem,
      error: state.moreInfo.error,
      loading: state.moreInfo.loading,
      saving: state.moreInfo.isSaving,
      saved: state.moreInfo.saved,
      edit
    };
  },
  {
    cancelEquipment,
    editEquipment,
    showMoreInfo,
    loadEquipment,
    saveEditEquipment
  }
)(withStyles(styles)(RetailMoreInfo));
