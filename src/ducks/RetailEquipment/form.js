// eslint-disable-next-line
import { Record } from "immutable";
import { appName } from "../../config";
import { all, put, takeEvery } from "redux-saga/effects";
import { collection } from "../../fakeData";

/**
 * Constants
 * */
export const moduleName = "equipmentForm";
const prefix = `${appName}/${moduleName}`;

export const LOAD_EQUIPMENT_REQUEST = `${prefix}/LOAD_EQUIPMENT_REQUEST`;
export const LOAD_EQUIPMENT_START = `${prefix}/LOAD_EQUIPMENT_START`;
export const LOAD_EQUIPMENT_SUCCESS = `${prefix}/LOAD_EQUIPMENT_SUCCESS`;
export const LOAD_EQUIPMENT_ERROR = `${prefix}/LOAD_EQUIPMENT_ERROR`;

export const SAVE_EDIT_EQUIPMENT_REQUEST = `${prefix}/SAVE_EDIT_EQUIPMENT_REQUEST`;
export const SAVE_EDIT_EQUIPMENT_START = `${prefix}/SAVE_EDIT_EQUIPMENT_START`;
export const SAVE_EDIT_EQUIPMENT_SUCCESS = `${prefix}/SAVE_EDIT_EQUIPMENT_SUCCESS`;
export const SAVE_EDIT_EQUIPMENT_ERROR = `${prefix}/SAVE_EDIT_EQUIPMENT_ERROR`;

export const SHOW_EQUIPMENT = `${prefix}/SHOW_EQUIPMENT`;
export const EDIT_EQUIPMENT = `${prefix}/EDIT_EQUIPMENT`;
export const CANCEL_EQUIPMENT = `${prefix}/CANCEL_EQUIPMENT`;

const EquipmentFormModel = new Record({
  activeItem: null,
  location: null,
  edit: false,
  isLoading: false,
  isSaving: false,
  saved: false,
  error: null
});

let defaultForm = new EquipmentFormModel();

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
      return state.set("isLoading", true).set("saved", false);

    case LOAD_EQUIPMENT_SUCCESS:
      return state
        .set("isLoading", false)
        .set("activeItem", payload.activeItem);
    case SAVE_EDIT_EQUIPMENT_ERROR:
    case LOAD_EQUIPMENT_ERROR:
      return state.setIn(["error"], payload.error).set("isLoading", false);

    case SHOW_EQUIPMENT:
      return state.setIn(["edit"], false).set("saved", false);

    case EDIT_EQUIPMENT:
      return state.setIn(["edit"], true).set("saved", false);

    case CANCEL_EQUIPMENT:
      return state.setIn(["edit"], false).set("saved", false);

    case SAVE_EDIT_EQUIPMENT_START:
      return state.set("saved", false).set("isSaving", true);
    case SAVE_EDIT_EQUIPMENT_SUCCESS:
      const { editedItem } = action.payload;
      return state.set("saved", true).set("isSaving", false);

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
export function loadEquipment(location) {
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
export function showEquipment() {
  const action = {
    type: SHOW_EQUIPMENT
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function editEquipment() {
  const action = {
    type: EDIT_EQUIPMENT
  };

  return action;
}

/**
 * Создает экшн для запроса на изменение данных об оборудовании
 * @return {Object} объект экшена
 */
export function saveEditEquipment(editItem) {
  const action = {
    type: SAVE_EDIT_EQUIPMENT_REQUEST,
    payload: {
      editItem
    }
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function cancelEquipment() {
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

  let promise = new Promise(function(resolve) {
    setTimeout(() => {
      resolve(activeItem);
    }, 2000);
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");

    const activeItem = yield promise.then(result => {
      return result;
    });

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

export const saveEditSaga = function*(action) {
  const editItem = action.payload.editItem;

  yield put({
    type: SAVE_EDIT_EQUIPMENT_START
  });

  let promise = new Promise(function(resolve) {
    setTimeout(() => {
      resolve(editItem);
    }, 2000);
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка сохранения данных");

    const editedItem = yield promise.then(result => {
      return result;
    });

    yield put({
      type: SAVE_EDIT_EQUIPMENT_SUCCESS,
      payload: { editedItem }
    });
  } catch (error) {
    yield put({
      type: SAVE_EDIT_EQUIPMENT_ERROR,
      payload: { error }
    });
  }
};

export const saga = function*() {
  yield all([
    takeEvery(LOAD_EQUIPMENT_REQUEST, loadSaga),
    takeEvery(SAVE_EDIT_EQUIPMENT_REQUEST, saveEditSaga)
  ]);
};
