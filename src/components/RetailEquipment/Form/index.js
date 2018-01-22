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
  commercialNetworkSelector,
  tradePointSelector
} from "../../../ducks/RetailEquipment/equipment";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import SimpleSnackbar from "../../SimpleSnackbar";
import LinearQuery from "../../LinearQuery/index";
import CircularSaveButton from "../../CircularSaveButton";
import moment from "moment";
import TrendingUpIcon from "material-ui-icons/TrendingUp";
import TrendingDownIcon from "material-ui-icons/TrendingDown";
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
      serialNumber: "Данные отсутствуют",
      remain: "Данные отсутствуют",
      location: "Москва" + "",
      date: "Данные отсутствуют",
      additionalInformation: "Данные отсутствуют"
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
        serialNumber,
        commercialNetwork,
        tradePoint,
        remain,
        refill,
        location,
        dateUpdate,
        additionalInformation
      } = nextProps.fridge;

      this.setState({
        serialNumber,
        commercialNetwork,
        tradePoint,
        remain,
        refill,
        location,
        dateUpdate,
        additionalInformation
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
            onChange={this.handleChange("serialNumber")}
            name={"serial"}
            value={this.state.serialNumber}
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
            <span className={classes.text}>{this.state.serialNumber}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Торговая сеть"
            onChange={this.handleChange("commercialNetwork")}
            name={"serial"}
            value={this.state.commercialNetwork}
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
            <span className={classes.text}>{this.state.commercialNetwork}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Торговая точка"
            // onChange={this.handleChange("commercialNetwork")}
            // name={"serial"}
            value={this.state.tradePoint}
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
            <span className={classes.text}>{this.state.tradePoint}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Максимальный вес"
            value={this.state.remain}
            onChange={this.handleChange("remain")}
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
            <span className={classes.text}>{this.state.remain}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Текущий вес"
            value={this.state.remain}
            onChange={this.handleChange("remain")}
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
            <span className={classes.text}>{this.state.remain}</span>
          </FormControl>
        )}

        {edit ? (
          <TextField
            id="full-width"
            label="Процент наполнения"
            value={this.state.remain}
            onChange={this.handleChange("remain")}
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
            <FormHelperText>Процент наполнения</FormHelperText>
            <span className={classes.text}>{this.state.remain}</span>
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
              {moment(this.state.dateUpdate).format("YYYY-MM-DDThh:mm")}
            </span>
          </FormControl>
        )}

        {this.state.refill ? (
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
        ) : (
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
        )}

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
    console.log(state.moreInfo.activeItem);

    return {
      networks: commercialNetworkSelector(state),
      points: tradePointSelector(state),
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
