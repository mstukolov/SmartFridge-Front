import { call, put, takeLatest } from "redux-saga/effects";
import { appName } from "../../config";
import { Record } from "immutable";
import { createSelector } from "reselect";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const AUTH_REQUEST = `${prefix}/AUTH_REQUEST`;
export const AUTH_SUCCESS = `${prefix}/AUTH_SUCCESS`;
export const AUTH_FAILURE = `${prefix}/AUTH_FAILURE`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  token: localStorage.getItem("token"),
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

function* authorize({ payload: { login, password } }) {
  const options = {
    body: JSON.stringify({ login, password }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    const { token } = yield call(fetchJSON, "/login", options);
    yield put({ type: AUTH_SUCCESS, payload: token });
    localStorage.setItem("token", token);
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = "Something went wrong";
    }
    yield put({ type: AUTH_FAILURE, payload: message });
    localStorage.removeItem("token");
  }
}

export function* saga() {
  yield takeLatest(AUTH_REQUEST, authorize);
}
