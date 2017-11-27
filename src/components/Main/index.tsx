import * as React from "react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default Main;
