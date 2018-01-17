import { all, put, takeEvery } from "redux-saga/effects";
import { appName } from "../../config";
import { Record, List } from "immutable";
import { schedule as report } from "../../fakeData";
import { createSelector } from "reselect";

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

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  serialNumber: null,
  loading: false,
  loaded: false
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
      return state.setIn(["serialNumber"], payload.serialNumber);
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

export const serialNumberSelector = createSelector(
  stateSelector,
  state => state.serialNumber
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
 * Создает экшн для сохранения serialNumber холодильника
 * @return {Object}         объект экшена
 */
export function saveId(serialNumber) {
  const action = {
    type: SAVE_FIRDGE_ID,
    payload: { serialNumber }
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

export function* saga() {
  yield all([takeEvery(LOAD_PLANAGRAMM_DATA_REQUEST, identifyFridgeSaga)]);
}
