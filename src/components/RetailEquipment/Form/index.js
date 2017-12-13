/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";
import {
  cancelEquipment,
  editEquipment,
  showEquipment,
  loadEquipment,
  saveEditEquipment
} from "../../../ducks/RetailEquipment/form";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import { Link } from "react-router-dom";
import SimpleSnackbar from "../../SimpleSnackbar";
import LinearQuery from "../../LinearQuery/index";
import { RouteEquipmentPage } from "../../routes/constants";
import CircularSaveButton from "../../CircularSaveButton";

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
  buttonLink: { textDecoration: "none" },

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
  }
});

/**
 * Компонент формы просмотра/редактирования оборудования
 * @extends React
 */
class RetailEquipmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: "Данные отсутствуют",
      serial: "Данные отсутствуют",
      type: "Данные отсутствуют",
      front: "Данные отсутствуют",
      completeness: "Данные отсутствуют",
      cost: "Данные отсутствуют",
      location: "Данные отсутствуют",
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
   * Создает список пунктов для селекта выбора модели устройства
   * @returns {ReactElement}
   */
  getModels = () => {
    if (this.props.models) {
      const items = [];
      for (const [key, item] of this.props.models) {
        items.push(
          <MenuItem key={key} value={key}>
            {item}
          </MenuItem>
        );
      }
      return items;
    }

    return null;
  };

  /**
   * Создает список пунктов для селекта выбора типа устройства
   * @returns {ReactElement}
   */
  getTypes = () => {
    if (this.props.types) {
      const items = [];
      for (const [key, item] of this.props.types) {
        items.push(
          <MenuItem key={key} value={key}>
            {item}
          </MenuItem>
        );
      }
      return items;
    }

    return null;
  };

  /**
   * Создает список пунктов для селекта выбора фронта устройства
   * @returns {ReactElement}
   */
  getFront = () => {
    if (this.props.front) {
      const items = [];
      for (const [key, item] of this.props.front) {
        items.push(
          <MenuItem key={key} value={key}>
            {item}
          </MenuItem>
        );
      }
      return items;
    }

    return null;
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
            isLoading={this.props.saving}
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
        <Link to={RouteEquipmentPage} className={classes.buttonLink}>
          <Button className={classes.button} raised color="accent">
            Отменить
          </Button>
        </Link>

        {btns}
      </div>
    );
  };

  /**
   * Обработка клика по кнопке отмены
   * {SynteticEvent} ev событие react
   */
  handleBtnCancelClick = ev => {
    ev.preventDefault();
    this.props.cancelEquipment();
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
        model,
        serial,
        type,
        front,
        completeness,
        cost,
        location,
        date,
        additionalInformation
      } = nextProps.fridge;

      this.setState({
        model,
        serial,
        type,
        front,
        completeness,
        cost,
        location,
        date,
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
    this.props.showEquipment();
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
    const { classes } = this.props;
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
        <FormControl
          disabled={this.isDisabledControl()}
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="model">Модель</InputLabel>
          <Select
            value={this.state.model}
            onChange={this.handleChange("model")}
            input={<Input name="model" id="model" />}
            autoWidth
          >
            {this.getModels()}
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <TextField
          id="full-width"
          label="Серийный номер"
          onChange={this.handleChange("serial")}
          name={"serial"}
          value={this.state.serial}
          disabled={this.isDisabledControl()}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Cерийный номер"
          helperText="15 символов"
          fullWidth
          margin="normal"
        />

        <FormControl
          disabled={this.isDisabledControl()}
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="type">Тип</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleChange("type")}
            input={<Input name="type" id="type" />}
            autoWidth
          >
            {this.getTypes()}
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <FormControl
          disabled={this.isDisabledControl()}
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="front">Тип фронтальной части</InputLabel>
          <Select
            value={this.state.front}
            onChange={this.handleChange("front")}
            input={<Input name="front" id="front" />}
            autoWidth
          >
            {this.getFront()}
          </Select>
          <FormHelperText>5 символов</FormHelperText>
        </FormControl>

        <TextField
          id="full-width"
          label="Комплектность"
          value={this.state.completeness}
          onChange={this.handleChange("completeness")}
          disabled={this.isDisabledControl()}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Комплектность"
          helperText="15 символов"
          fullWidth
          margin="normal"
        />

        <TextField
          id="full-width"
          label="Стоимость"
          value={this.state.cost}
          onChange={this.handleChange("cost")}
          disabled={this.isDisabledControl()}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Стоимость"
          helperText="15 символов"
          fullWidth
          margin="normal"
        />

        <TextField
          id="full-width"
          label="Локация"
          onChange={this.handleChange("location")}
          value={this.state.location}
          disabled={this.isDisabledControl()}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Локация"
          helperText="10 символов"
          fullWidth
          margin="normal"
        />

        <TextField
          fullWidth
          id="multiline-flexible"
          label="Дополниельная информация"
          disabled={this.isDisabledControl()}
          multiline
          rowsMax="4"
          value={this.state.additionalInformation}
          onChange={this.handleChange("additionalInformation")}
        />

        {this.getButtonSet()}
      </form>
    );
  }
}

RetailEquipmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired
};

export default connect(
  state => {
    const edit = state.equipmentForm.get("edit");
    console.log(
      "state.equipmentForm.activeItem",
      state.equipmentForm.activeItem
    );

    return {
      fridge: state.equipmentForm.activeItem,
      error: state.equipmentForm.error,
      loading: state.equipmentForm.isLoading,
      saving: state.equipmentForm.isSaving,
      saved: state.equipmentForm.saved,
      models: state.vocabulary.get("models"),
      types: state.vocabulary.get("types"),
      front: state.vocabulary.get("front"),
      edit
    };
  },
  {
    cancelEquipment,
    editEquipment,
    showEquipment,
    loadEquipment,
    saveEditEquipment
  }
)(withStyles(styles)(RetailEquipmentForm));
