import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { appName } from "../../config";
import { Record } from "immutable";
import { createSelector } from "reselect";
import history from "../../redux/history";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const AUTH_REQUEST = `${prefix}/AUTH_REQUEST`;
export const AUTH_SUCCESS = `${prefix}/AUTH_SUCCESS`;
export const AUTH_FAILURE = `${prefix}/AUTH_FAILURE`;

export const LOG_OUT_REQUEST = `${prefix}/LOG_OUT_REQUEST`;
export const LOG_OUT_SUCCESS = `${prefix}/LOG_OUT_SUCCESS`;
export const LOG_OUT_FAILURE = `${prefix}/LOG_OUT_FAILURE`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  token:
    localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")),
  error: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SUCCESS: {
      return state.set("token", payload);
    }
    case AUTH_FAILURE: {
      return state.set("error", payload);
    }

    case LOG_OUT_SUCCESS: {
      return state.set("token", null).set("error", null);
    }
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const tokenSelector = createSelector(
  stateSelector,
  state => state.token
);

export const errorSelector = createSelector(
  stateSelector,
  state => state.error
);

/**
 * Action Creators
 * */
export const authorizeAction = (login, password) => ({
  type: AUTH_REQUEST,
  payload: { login, password }
});

export const logOutAction = () => ({
  type: LOG_OUT_REQUEST
});
/**
 * Sagas
 * */

const fetchJSON = (url, options = {}) =>
  new Promise((resolve, reject) => {
    return fetch(url, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

function* logOut() {
  window.localStorage.removeItem("token");
  history.push("/login");
  try {
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE });
  }
}

function* authorize({ payload: { login, password } }) {
  const options = {
    body: JSON.stringify({ login, password }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    // const { token } = yield call(fetchJSON, "/login", options);
    const token = {
      login: "van",
      password: "1234",
      name: "Иван",
      surname: "Иванов"
    };
    yield put({ type: AUTH_SUCCESS, payload: token });
    localStorage.setItem("token", JSON.stringify(token));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Внутренняя ошибка сервера";
        break;
      case 401:
        message = "Недопустимые учетные данные";
        break;
      default:
        message = "Что-то пошло не так";
    }
    yield put({ type: AUTH_FAILURE, payload: message });
    localStorage.removeItem("token");
  }
}

export function* saga() {
  yield all([
    takeLatest(AUTH_REQUEST, authorize),
    takeEvery(LOG_OUT_REQUEST, logOut)
  ]);
}
