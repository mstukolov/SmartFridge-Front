import React from "react";
import ReactDOM from "react-dom";
import CircularSaveButton from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CircularSaveButton />, div);
});
