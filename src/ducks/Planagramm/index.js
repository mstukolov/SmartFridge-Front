import { all, put, takeEvery } from "redux-saga/effects";
import { appName } from "../../config";
import { Record, Map } from "immutable";
import { schedule as report } from "../../fakeData";
import { createSelector } from "reselect";
import { storageDB } from "./indexDBHelpers";

storageDB.init();

/**
 * Constants
 * */
export const moduleName = "planagramm";
const prefix = `${appName}/${moduleName}`;

export const LOAD_PLANAGRAMM_DATA_REQUEST = `${prefix}/LOAD_PLANAGRAMM_DATA_REQUEST`;
export const LOAD_PLANAGRAMM_DATA_START = `${prefix}/LOAD_PLANAGRAMM_DATA_START`;
export const LOAD_PLANAGRAMM_DATA_SUCCESS = `${prefix}/LOAD_PLANAGRAMM_DATA_SUCCESS`;
export const LOAD_PLANAGRAMM_DATA_ERROR = `${prefix}/LOAD_PLANAGRAMM_DATA_ERROR`;
export const SAVE_FIRDGE_ID = `${prefix}/SAVE_FIRDGE_ID`;
export const SAVE_FIRDGE_LOACTION = `${prefix}/SAVE_FIRDGE_LOACTION`;
export const SAVE_FILE = `${prefix}/SAVE_FILE`;

export const GET_FILE_FROM_INDEXEDDB_REQUEST = `${prefix}/GET_FILE_FROM_INDEXEDDB_REQUEST`;
export const GET_FILE_FROM_INDEXEDDB_START = `${prefix}/GET_FILE_FROM_INDEXEDDB_START`;
export const GET_FILE_FROM_INDEXEDDB_SUCCESS = `${prefix}/GET_FILE_FROM_INDEXEDDB_SUCCESS`;
export const GET_FILE_FROM_INDEXEDDB_ERROR = `${prefix}/GET_FILE_FROM_INDEXEDDB_ERROR`;

const locationModel = new Map({
  latitude: null,
  longitude: null,
  accuracy: null
});

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  location: locationModel,
  Requipserialnumber: null,
  loading: false,
  loaded: false,
  photo: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PLANAGRAMM_DATA_START:
      return state.setIn(["loading"], true);
    case LOAD_PLANAGRAMM_DATA_SUCCESS:
      return (
        state
          // .setIn(["data"], new List(payload.data))
          .setIn(["loading"], false)
          .setIn(["loaded"], true)
      );
    case LOAD_PLANAGRAMM_DATA_ERROR:
      return state.setIn(["loading"], false).setIn(["loaded"], false);
    case SAVE_FIRDGE_ID:
      return state.setIn(["Requipserialnumber"], payload.Requipserialnumber);
    case SAVE_FIRDGE_LOACTION:
      return state.setIn(["location"], new Map(payload.location));
    case SAVE_FILE:
      console.log("payload.fileData ===> ", payload.fileData);
      storageDB.set(payload.fileData);
      return state;
    case GET_FILE_FROM_INDEXEDDB_SUCCESS:
      return state.setIn(["photo"], payload.file);
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const loadedSelector = createSelector(
  stateSelector,
  state => state.loaded
);

export const RequipserialnumberSelector = createSelector(
  stateSelector,
  state => state.Requipserialnumber
);

export const locationSelector = createSelector(stateSelector, state =>
  state.location.toJS()
);

// const valueout = state[moduleName].data.map(item => {
//     return { x: item.recdate, y: item.valueout };
// });
//
// const valuein = state[moduleName].data.map(item => {
//     return { x: item.recdate, y: item.valuein };
// });

/**
 * Action Creators
 * */

/**
 * Создает экшн для запрос данных для формирования отчетов
 * @return {Object}         объект экшена
 */
export function loadData() {
  const action = {
    type: LOAD_PLANAGRAMM_DATA_REQUEST
  };

  return action;
}

/**
 * Создает экшн для сохранения Requipserialnumber холодильника
 * @return {Object}         объект экшена
 */
export function saveId(Requipserialnumber) {
  const action = {
    type: SAVE_FIRDGE_ID,
    payload: { Requipserialnumber }
  };

  return action;
}

/**
 * Создает экшн для сохранения расположения холодильника
 * @param location
 * @returns {{type: *, payload: {location: *}}}
 */
export function saveLocation(location) {
  const action = {
    type: SAVE_FIRDGE_LOACTION,
    payload: { location }
  };

  return action;
}

/**
 * Создает экшн для сохранения изображения
 * @param fileData
 * @returns {{type: *, payload: {location: *}}}
 */
export function saveFileData(fileData) {
  const action = {
    type: SAVE_FILE,
    payload: { fileData }
  };

  return action;
}

export function getFileFromIndexedDB() {
  const action = {
    type: GET_FILE_FROM_INDEXEDDB_REQUEST
  };

  return action;
}

/**
 * Sagas
 * */
export const identifyFridgeSaga = function*(action) {
  // const { report } = action.payload;

  yield put({
    type: LOAD_PLANAGRAMM_DATA_START
  });

  let promise = new Promise(function(resolve) {
    setTimeout(() => {
      resolve(report);
    }, 2000);
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");
    const newPlanagramm = yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_PLANAGRAMM_DATA_SUCCESS,
      payload: {
        data: JSON.parse(newPlanagramm, (key, value) => {
          if (key === "recdate") return new Date(value);
          return value;
        })
      }
    });
  } catch (error) {
    yield put({
      type: LOAD_PLANAGRAMM_DATA_ERROR,
      payload: { error }
    });
  }
};

export const getFilesFromDBSaga = function*(action) {
  // const { report } = action.payload;

  yield put({
    type: GET_FILE_FROM_INDEXEDDB_START
  });

  try {
    const file = yield storageDB.get(1).then(result => {
      return result;
    });

    yield put({
      type: GET_FILE_FROM_INDEXEDDB_SUCCESS,
      payload: {
        file
      }
    });
  } catch (error) {
    yield put({
      type: GET_FILE_FROM_INDEXEDDB_ERROR,
      payload: { error }
    });
  }
};

export function* saga() {
  yield all([
    takeEvery(LOAD_PLANAGRAMM_DATA_REQUEST, identifyFridgeSaga),
    takeEvery(GET_FILE_FROM_INDEXEDDB_REQUEST, getFilesFromDBSaga)
  ]);
}
