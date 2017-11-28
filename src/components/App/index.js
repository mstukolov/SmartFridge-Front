import React, { Component } from "react";
import "./style.css";
import { Switch, Route } from "react-router-dom";

import MenuAppBar from "../MenuAppBar";
import ButtonAppBar from "../ButtonAppBar";
import MainPage from "../../pages/Main";
import TablePage from "../../pages/Table";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuAppBar />
        <section>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/table" component={TablePage} />
            {/* <Route path="/schedule" component={Schedule} /> */}
          </Switch>
        </section>

        <ButtonAppBar />
      </div>
    );
  }
}

export default App;
