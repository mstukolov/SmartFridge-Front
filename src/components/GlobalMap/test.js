import React from "react";
import ReactDOM from "react-dom";
import GlobalMap from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GlobalMap />, div);
});
