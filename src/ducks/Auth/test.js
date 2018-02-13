import {
  ReducerRecord,
  tokenSelector,
  errorSelector,
  authorizeAction,
  AUTH_REQUEST,
  logOutAction,
  LOG_OUT_REQUEST
} from "./index";

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
