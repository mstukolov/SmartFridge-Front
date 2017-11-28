import React, { Component } from "react";
import "./style.css";
import { Switch, Route } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import MainPage from "../../pages/Main";
import TablePage from "../../pages/Table";

/**
 * Компонент приложения с базовой разметкой
 * @extends Component
 */
class App extends Component {
  /**
   * render
   * @return {ReactElement} разметка
   */
  render() {
    return (
      <div className="App">
        <Header />
        <section>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/table" component={TablePage} />
            {/* <Route path="/schedule" component={Schedule} /> */}
          </Switch>
        </section>

        <Footer />
      </div>
    );
  }
}

export default App;
