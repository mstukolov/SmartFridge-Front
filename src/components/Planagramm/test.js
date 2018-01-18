import React from "react";
import ReactDOM from "react-dom";
import Planagramm from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Planagramm />, div);
});
