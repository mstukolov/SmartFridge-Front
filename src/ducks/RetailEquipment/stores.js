import { all, takeEvery, put } from "redux-saga/effects";
import { appName, backendUrl } from "../../config";
import { List, Record } from "immutable";
import { createSelector } from "reselect";
import axios from "axios/index";

/**
 * Constants
 * */
export const moduleName = "stores";
const prefix = `${appName}/${moduleName}`;

export const LOAD_REQUEST = `${prefix}/LOAD_REQUEST`;
export const LOAD_START = `${prefix}/LOAD_START`;
export const LOAD_SUCCESS = `${prefix}/LOAD_SUCCESS`;
export const LOAD_ERROR = `${prefix}/LOAD_ERROR`;
/**
 * Reducer
 * */
export const ReducerRecord = Record({
  items: new List(),
  loading: false,
  loaded: false
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_START:
      return state.set("loading", true);
    case LOAD_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .setIn(["items"], new List(payload.items));

    case LOAD_ERROR:
      return state
        .setIn(["error"], payload.error)
        .set("loading", false)
        .set("loaded", false);

    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];

// селектор индикатора загрузки
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
);

// селектор точек для карты
const storesSelectorGetter = state => state[moduleName].get("items");

/**
 * Action Creators
 * */

/**
 * Запрашивает данные о всех торговых точках
 * @return {Object}         объект экшена
 */
export function loadAll() {
  const action = {
    type: LOAD_REQUEST
  };

  return action;
}

/**
 * Sagas
 * */
export const loadLocationSaga = function*(action) {
  yield put({
    type: LOAD_START
  });

  let promise = axios.get("/retailstores/all", {
    baseURL: backendUrl,
    withCredentials: false
  });

  try {
    const stores = yield promise.then(result => {
      return result.data.retailstores;
    });

    yield put({
      type: LOAD_SUCCESS,
      payload: { items: stores }
    });
  } catch (error) {
    yield put({
      type: LOAD_ERROR,
      payload: { error }
    });
  }
};

export function* saga() {
  yield all([takeEvery(LOAD_REQUEST, loadLocationSaga)]);
}
