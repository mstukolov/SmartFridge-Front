import { all, takeEvery, put } from "redux-saga/effects";
import { appName } from "../../config";
import { OrderedMap, Record } from "immutable";
import { location as collection } from "../../fakeData";

/**
 * Constants
 * */
export const moduleName = "equipmentLocation";
const prefix = `${appName}/${moduleName}`;

export const LOAD_LOCATION_REQUEST = `${prefix}/LOAD_LOCATION_REQUEST`;
export const LOAD_LOCATION_START = `${prefix}/LOAD_LOCATION_START`;
export const LOAD_LOCATION_SUCCESS = `${prefix}/LOAD_LOCATION_SUCCESS`;
export const LOAD_LOCATION_ERROR = `${prefix}/LOAD_LOCATION_ERROR`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  collection: new OrderedMap({}),
  loading: false
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_LOCATION_START:
      return state.set("loading", true);
    case LOAD_LOCATION_SUCCESS:
      return state
        .set("loading", false)
        .setIn(["collection"], new OrderedMap(payload.collection));

    case LOAD_LOCATION_ERROR:
      return state.setIn(["error"], payload.error).set("loading", false);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

/**
 * Создает экшн выбора всего оборудования из списка
 * @return {Object}         объект экшена
 */
export function loadAll() {
  const action = {
    type: LOAD_LOCATION_REQUEST
  };

  return action;
}
/**
 * Sagas
 * */
export const loadLocationSaga = function*(action) {
  // const { collection } = action.payload;

  yield put({
    type: LOAD_LOCATION_START
  });

  let promise = new Promise(function(resolve) {
    setTimeout(() => {
      resolve(collection);
    }, 2000);
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");
    const newCollection = yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_LOCATION_SUCCESS,
      payload: { collection: newCollection }
    });
  } catch (error) {
    yield put({
      type: LOAD_LOCATION_ERROR,
      payload: { error }
    });
  }
};

export function* saga() {
  yield all([takeEvery(LOAD_LOCATION_REQUEST, loadLocationSaga)]);
}
