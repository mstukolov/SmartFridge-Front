import React from "react";
import ReactDOM from "react-dom";
import LinearQuery from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LinearQuery />, div);
});
