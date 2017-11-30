import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import MainPage from "../../pages/Main";
import SchedulePage from "../../pages/Schedule";
import injectSheet from "react-jss";

const styles = {
  container: {
    minHeight: "calc(100vh - 128px)",
    padding: "16px",
    boxSizing: "border-box"
  }
};

/**
 * Компонент приложения с базовой разметкой
 * @extends Component
 */
class App extends Component {
  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Header />
        <section className={classes.container}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/schedule" component={SchedulePage} />
            {/* <Route path="/schedule" component={Schedule} /> */}
          </Switch>
        </section>

        <Footer />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
