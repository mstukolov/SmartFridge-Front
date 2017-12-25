import { all, put, takeEvery } from "redux-saga/effects";
import { appName } from "../../config";
import { Record, List } from "immutable";
import { schedule as report } from "../../fakeData";
import moment from "moment";

/**
 * Constants
 * */
export const moduleName = "report";
const prefix = `${appName}/${moduleName}`;

export const LOAD_REPORT_DATA_REQUEST = `${prefix}/LOAD_REPORT_DATA_REQUEST`;
export const LOAD_REPORT_DATA_START = `${prefix}/LOAD_REPORT_DATA_START`;
export const LOAD_REPORT_DATA_SUCCESS = `${prefix}/LOAD_REPORT_DATA_SUCCESS`;
export const LOAD_REPORT_DATA_ERROR = `${prefix}/LOAD_REPORT_DATA_ERROR`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  reportData: new List([])
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_REPORT_DATA_SUCCESS:
      return state.setIn(["reportData"], new List(payload.reportData));
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
 * Создает экшн для запрос данных для формирования отчетов
 * @return {Object}         объект экшена
 */
export function loadData() {
  const action = {
    type: LOAD_REPORT_DATA_REQUEST
  };

  return action;
}

/**
 * Sagas
 * */
export const loadReportSaga = function*(action) {
  // const { report } = action.payload;

  yield put({
    type: LOAD_REPORT_DATA_START
  });

  let promise = new Promise(function(resolve) {
    setTimeout(() => {
      resolve(report);
    }, 2000);
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");
    const newReport = yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_REPORT_DATA_SUCCESS,
      payload: {
        reportData: JSON.parse(newReport, (key, value) => {
          if (key === "recdate") return new Date(value);
          return value;
        })
      }
    });
  } catch (error) {
    yield put({
      type: LOAD_REPORT_DATA_ERROR,
      payload: { error }
    });
  }
};

export function* saga() {
  yield all([takeEvery(LOAD_REPORT_DATA_REQUEST, loadReportSaga)]);
}
