// eslint-disable-next-line
import { Record, OrderedMap } from "immutable";
import { appName } from "../../config";
import { all, put, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";
import { equipment } from "../../fakeData";

/**
 * Constants
 * */
export const moduleName = "moreInfo";
const prefix = `${appName}/${moduleName}`;

export const LOAD_REQUEST = `${prefix}/LOAD_REQUEST`;
export const LOAD_START = `${prefix}/LOAD_START`;
export const LOAD_SUCCESS = `${prefix}/LOAD_SUCCESS`;
export const LOAD_ERROR = `${prefix}/LOAD_ERROR`;

export const SAVE_EDIT_REQUEST = `${prefix}/SAVE_EDIT_REQUEST`;
export const SAVE_EDIT_START = `${prefix}/SAVE_EDIT_START`;
export const SAVE_EDIT_SUCCESS = `${prefix}/SAVE_EDIT_SUCCESS`;
export const SAVE_EDIT_ERROR = `${prefix}/SAVE_EDIT_ERROR`;

export const SHOW = `${prefix}/SHOW`;
export const EDIT = `${prefix}/EDIT`;
export const CANCEL = `${prefix}/CANCEL`;

const MoreInfoModel = new Record({
  activeItem: null,
  location: null,
  edit: false,
  loading: false,
  isSaving: false,
  saved: false,
  error: null
});

let defaultForm = new MoreInfoModel();

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
    case LOAD_START:
      return state.set("loading", true).set("saved", false);

    case LOAD_SUCCESS:
      return state.set("loading", false).set("activeItem", payload.activeItem);
    case SAVE_EDIT_ERROR:
    case LOAD_ERROR:
      return state.setIn(["error"], payload.error).set("loading", false);

    case SHOW:
      return state.setIn(["edit"], false).set("saved", false);

    case EDIT:
      return state.setIn(["edit"], true).set("saved", false);

    case CANCEL:
      return state.setIn(["edit"], false).set("saved", false);

    case SAVE_EDIT_START:
      return state.set("saved", false).set("isSaving", true);
    case SAVE_EDIT_SUCCESS:
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
    type: LOAD_REQUEST,
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
export function showEquipment(id) {
  const action = {
    type: SHOW,
    payload: { id }
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function editEquipment(id) {
  const action = {
    type: EDIT,
    payload: { id }
  };

  return action;
}

/**
 * Создает экшн для запроса на изменение данных об оборудовании
 * @return {Object} объект экшена
 */
export function saveEditEquipment(editItem) {
  const action = {
    type: SAVE_EDIT_REQUEST,
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
    type: CANCEL
  };

  return action;
}

/**
 * Sagas
 */

export const loadSaga = function*(action) {
  const id = action.payload.location.split(":")[1];
  const activeItem = new OrderedMap(equipment).get(id);

  yield put({
    type: LOAD_START
  });

  let promise = new Promise(function(resolve) {
    resolve(activeItem);
  });

  yield delay(1000);

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");

    const activeItem = yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_SUCCESS,
      payload: { activeItem }
    });
  } catch (error) {
    yield put({
      type: LOAD_ERROR,
      payload: { error }
    });
  }
};

export const saveEditSaga = function*(action) {
  const editItem = action.payload.editItem;

  yield put({
    type: SAVE_EDIT_START
  });

  let promise = new Promise(function(resolve) {
    resolve(editItem);
  });
  yield delay(1000);

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка сохранения данных");

    const editedItem = yield promise.then(result => {
      return result;
    });

    yield put({
      type: SAVE_EDIT_SUCCESS,
      payload: { editedItem }
    });
  } catch (error) {
    yield put({
      type: SAVE_EDIT_ERROR,
      payload: { error }
    });
  }
};

export const saga = function*() {
  yield all([
    takeEvery(LOAD_REQUEST, loadSaga),
    takeEvery(SAVE_EDIT_REQUEST, saveEditSaga)
  ]);
};
