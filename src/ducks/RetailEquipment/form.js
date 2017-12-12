// eslint-disable-next-line
import { Record } from "immutable";
import { appName } from "../../config";
import { all, put, takeEvery } from "redux-saga/effects";
import { collection } from "../../fakeData";

/**
 * Constants
 * */
export const moduleName = "fridgeForm";
const prefix = `${appName}/${moduleName}`;
export const LOAD_EQUIPMENT_REQUEST = `${prefix}/LOAD_EQUIPMENT_REQUEST`;
export const LOAD_EQUIPMENT_START = `${prefix}/LOAD_EQUIPMENT_START`;
export const LOAD_EQUIPMENT_SUCCESS = `${prefix}/LOAD_EQUIPMENT_SUCCESS`;
export const LOAD_EQUIPMENT_ERROR = `${prefix}/LOAD_EQUIPMENT_ERROR`;
export const SHOW_EQUIPMENT = `${prefix}/SHOW_EQUIPMENT`;
export const EDIT_EQUIPMENT = `${prefix}/EDIT_EQUIPMENT`;
export const CANCEL_EQUIPMENT = `${prefix}/CANCEL_EQUIPMENT`;

const FridgeFormModel = new Record({
  activeItem: null,
  location: null,
  edit: false,
  isLoading: false,
  error: null
});

let defaultForm = new FridgeFormModel();

/**
 * Reducer
 * */

/**
 * Редьюссер хранения и обработки данных в форме просмотра/редактирования данных об устройстве
 * @param  {object} [state=defaultForm] принимает объект для работы с фильтрами
 * @param  {object} action                   обект экшена
 * @return {object}                          параметры фильтрации
 */
export default (state = defaultForm, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EQUIPMENT_START:
      return state.set("isLoading", true);

    case LOAD_EQUIPMENT_SUCCESS:
      return state
        .set("isLoading", false)
        .set("activeItem", payload.activeItem);
    case LOAD_EQUIPMENT_ERROR:
      return state.setIn(["error"], payload.error).set("isLoading", false);

    case SHOW_EQUIPMENT:
      return state.setIn(["edit"], false);

    case EDIT_EQUIPMENT:
      return state.setIn(["edit"], true);

    case CANCEL_EQUIPMENT:
      return state.setIn(["edit"], false);

    default:
      return state;
  }
};

/**
 * Action Creators
 * */

/**
 * Создает экшн для получения данных об оборудовании
 * @return {Object} объект экшена
 */
export function loadFridge(location) {
  const action = {
    type: LOAD_EQUIPMENT_REQUEST,
    payload: {
      location
    }
  };

  return action;
}
/**
 * Создает экшн для включения режима редактирования оборудования
 * @return {Object} объект экшена
 */
export function showFridge() {
  const action = {
    type: SHOW_EQUIPMENT
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function editFridge() {
  const action = {
    type: EDIT_EQUIPMENT
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function cancelFridge() {
  const action = {
    type: CANCEL_EQUIPMENT
  };

  return action;
}

/**
 * Sagas
 */

export const loadSaga = function*(action) {
  const id = action.payload.location.split(":")[1];
  const activeItem = collection.filter(item => {
    return item.id === id;
  })[0];

  yield put({
    type: LOAD_EQUIPMENT_START
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");

    yield put({
      type: LOAD_EQUIPMENT_SUCCESS,
      payload: { activeItem }
    });
  } catch (error) {
    yield put({
      type: LOAD_EQUIPMENT_ERROR,
      payload: { error }
    });
  }
};

export const saga = function*() {
  yield all([takeEvery(LOAD_EQUIPMENT_REQUEST, loadSaga)]);
};
