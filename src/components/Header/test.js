import React from "react";
import ReactDOM from "react-dom";
import Header from "./index";
import store from "../../redux/store";
import { Provider } from "react-redux";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Header />
    </Provider>,
    div
  );
});
