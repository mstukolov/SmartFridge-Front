import { put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { appName, backendUrl } from "../../config";
import { Record } from "immutable";
import { createSelector } from "reselect";
import history from "../../redux/history";
import { LOGIN_PAGE } from "../../routes/constants";
import axios from "axios";
import qs from "qs";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const AUTH_REQUEST = `${prefix}/AUTH_REQUEST`;
export const AUTH_START = `${prefix}/AUTH_START`;
export const AUTH_SUCCESS = `${prefix}/AUTH_SUCCESS`;
export const AUTH_FAILURE = `${prefix}/AUTH_FAILURE`;

export const LOG_OUT_REQUEST = `${prefix}/LOG_OUT_REQUEST`;
export const LOG_OUT_START = `${prefix}/LOG_OUT_START`;
export const LOG_OUT_SUCCESS = `${prefix}/LOG_OUT_SUCCESS`;
export const LOG_OUT_FAILURE = `${prefix}/LOG_OUT_FAILURE`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  token: null,
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

function* logOut() {
  yield put({ type: LOG_OUT_START });
  history.push(LOGIN_PAGE);
  try {
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE });
  }
}

function* authorize({ payload: { login, password } }) {
  yield put({
    type: AUTH_START
  });

  let promise = axios.post(
    `${backendUrl}/users/auth`,
    qs.stringify({
      login: login,
      password: password
    })
  );

  try {
    const token = yield promise.then(result => {
      const user = result.data.users;
      if (!user.auth) this.reject(new Error());
      return user;
    });
    yield put({ type: AUTH_SUCCESS, payload: token });
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Внутренняя ошибка сервера";
        break;
      case 401:
        message = "Ошибка доступа";
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
