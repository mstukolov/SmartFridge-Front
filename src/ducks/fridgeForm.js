// eslint-disable-next-line
import { Record } from "immutable";
import { appName } from "../config";

/**
 * Constants
 * */
export const moduleName = "fridgeForm";
const prefix = `${appName}/${moduleName}`;
export const SHOW_FRIDGE = `${prefix}/SHOW_FRIDGE`;
export const EDIT_FRIDGE = `${prefix}/EDIT_FRIDGE`;
export const CANCEL_FRIDGE = `${prefix}/CANCEL_FRIDGE`;

const FridgeFormModel = new Record({
  activeItem: {},
  edit: false
});

let defaultForm = new FridgeFormModel();

/**
 * Reducer
 * */

/**
 * Редьюссер хранения и обработки данных в форме просмотра/редактирования данных об устройстве
 * @param  {object} [formData=defaultForm] принимает объект для работы с фильтрами
 * @param  {object} action                   обект экшена
 * @return {object}                          параметры фильтрации
 */
export default (formData = defaultForm, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_FRIDGE:
      return formData.setIn(["edit"], false);

    case EDIT_FRIDGE:
      return formData.setIn(["edit"], true);

    case CANCEL_FRIDGE:
      return formData.setIn(["edit"], false);

    default:
      return formData;
  }
};

/**
 * Action Creators
 * */

/**
 * Создает экшн для включения режима редактирования оборудования
 * @return {Object} объект экшена
 */
export function showFridge() {
  const action = {
    type: SHOW_FRIDGE
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function editFridge() {
  const action = {
    type: EDIT_FRIDGE
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function cancelFridge() {
  const action = {
    type: CANCEL_FRIDGE
  };

  return action;
}
