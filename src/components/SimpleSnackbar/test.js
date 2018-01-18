import React from "react";
import ReactDOM from "react-dom";
import SimpleSanackbar from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SimpleSanackbar />, div);
});
