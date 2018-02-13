import {
  ReducerRecord,
  tokenSelector,
  errorSelector,
  authorizeAction,
  AUTH_REQUEST,
  logOutAction,
  LOG_OUT_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOG_OUT_SUCCESS
} from "./index";

import reducer from "./index";

const state = new ReducerRecord();

describe("Auth Selectors", () => {
  describe("tokenSelector", () => {
    it("should return login.token as null", () => {
      const selected = tokenSelector.resultFunc(state);
      expect(selected).toBeNull();
    });
  });

  describe("errorSelector", () => {
    it("should return login.token as null", () => {
      const selected = errorSelector.resultFunc(state);
      expect(selected).toBeNull();
    });
  });
});

const loginPayload = {
  login: "test",
  password: 123
};

const errorPayload = {
  message: "Ошибка авторизации"
};

describe("Auth actions", () => {
  describe("authorizeAction", () => {
    it("should create an action to log in", () => {
      const expectedAction = {
        type: AUTH_REQUEST,
        payload: loginPayload
      };
      expect(
        authorizeAction(loginPayload.login, loginPayload.password)
      ).toEqual(expectedAction);
    });
  });

  describe("logOutAction", () => {
    it("should create an action to log out", () => {
      const expectedAction = {
        type: LOG_OUT_REQUEST
      };
      expect(logOutAction()).toEqual(expectedAction);
    });
  });
});

describe("Auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(new ReducerRecord());
  });

  it("should handle AUTH_SUCCESS", () => {
    const successAction = {
      type: AUTH_SUCCESS,
      payload: loginPayload // important to pass correct payload, that's what the tests are for ;)
    };

    const state = new ReducerRecord().setIn(["token"], loginPayload);
    expect(reducer(undefined, successAction)).toEqual(state);
  });

  it("should handle AUTH_FAILURE", () => {
    const errorAction = {
      type: AUTH_FAILURE,
      payload: errorPayload // important to pass correct payload, that's what the tests are for ;)
    };

    const state = new ReducerRecord().setIn(["error"], errorPayload);
    expect(reducer(undefined, errorAction)).toEqual(state);
  });

  it("should handle LOG_OUT_SUCCESS", () => {
    const logoutAction = {
      type: LOG_OUT_SUCCESS
    };

    const logInState = new ReducerRecord().setIn(["token"], loginPayload);
    expect(reducer(logInState, logoutAction)).toEqual(new ReducerRecord());
  });
});
