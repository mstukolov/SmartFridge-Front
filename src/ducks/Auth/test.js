import { ReducerRecord, tokenSelector, errorSelector } from "./index";

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
