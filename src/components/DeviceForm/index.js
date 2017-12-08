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

import Done from "material-ui-icons/Done";
import ModeEditIcon from "material-ui-icons/ModeEdit";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    textAlign: "right",
    width: "100%"
  }
});

/**
 * Компонент формы просмотра/редактирования оборудования
 * @extends React
 */
class DeviceForm extends React.Component {
  state = {
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

  /**
   * Функция обработки изменений занчения поля
   * @param name имя поля
   * @returns {void}
   */
  handleChange = name => event => {
    console.log("set - " + name, event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };

  /**
   * Обработка отправки формы
   * @param ev
   */
  handleSubmit = ev => {
    console.log("submit -->", this.state);
  };

  /**
   * Создает список пунктов для селекта выбора модели устройства
   * @returns {ReactElement}
   */
  getModels = () => {
    if (this.props.models)
      return this.props.models.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      });
    return null;
  };

  /**
   * Создает список пунктов для селекта выбора типа устройства
   * @returns {ReactElement}
   */
  getTypes = () => {
    if (this.props.types)
      return this.props.types.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      });
    return null;
  };

  /**
   * Создает список пунктов для селекта выбора фронта устройства
   * @returns {ReactElement}
   */
  getFront = () => {
    if (this.props.front)
      return this.props.front.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      });
    return null;
  };

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
    const { classes } = this.props;
    const btns = this.props.edit ? (
      <Button
        onClick={this.handleSubmit}
        className={classes.button}
        raised
        color="primary"
      >
        Сохранить
        <Done className={classes.rightIcon} />
      </Button>
    ) : (
      <Button className={classes.button} raised color="primary">
        Редактировать
        <ModeEditIcon className={classes.rightIcon} />
      </Button>
    );
    return (
      <div className={classes.buttonSet}>
        <Button className={classes.button} raised color="accent">
          Отменить
        </Button>
        {btns}
      </div>
    );
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

  componentDidMount() {
    const { fridge } = this.props;
    console.log("---=>", fridge);

    this.setState({
      model: fridge.model || "Данные отсутствуют",
      serial: fridge.serial || "Данные отсутствуют",
      type: fridge.type || "Данные отсутствуют",
      front: fridge.front || "Данные отсутствуют",
      completeness: fridge.completeness || "Данные отсутствуют",
      cost: fridge.cost || "Данные отсутствуют",
      location: fridge.location || "Данные отсутствуют",
      date: fridge.date || "Данные отсутствуют",
      additionalInformation:
        fridge.additionalInformation || "Данные отсутствуют"
    });
  }
}

DeviceForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(state => {
  const edit = state.fridgeForm.get("edit");
  const { models, types, front } = state.vocabulary;
  const fridge = state.fridges.selected.first();
  // TODO: Переделать организацию хранения данных в сторэдж
  const storageItem = JSON.parse(localStorage.getItem("activeItem"));
  return {
    fridge: fridge || storageItem,
    models,
    types,
    front,
    edit
  };
}, {})(withStyles(styles)(DeviceForm));
