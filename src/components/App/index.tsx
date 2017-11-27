import * as React from "react";
import "./style.css";
import { Switch, Route } from "react-router-dom";
import AuthPage from "../../pages/auth";
import TablePage from "../../pages/table";
// import Header from "../Header/index";

const logo = require("./logo.svg");

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome Coca Cola fridge</h2>
        </div>

        <Switch>
          <Route exact path="/" component={AuthPage} />
          <Route exact path="/table" component={TablePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
