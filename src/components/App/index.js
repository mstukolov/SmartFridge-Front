import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import MainPage from "../../pages/Main";
import SchedulePage from "../../pages/Schedule";
import injectSheet from "react-jss";

const styles = {
  container: {
    height: "calc(100vh - 128px)",
    marginTop: "64px",
    marginBottom: "64px",
    boxSizing: "border-box",
    overflow: "auto"
  },
  inner: {
    padding: "16px"
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
          <div className={classes.inner}>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/schedule" component={SchedulePage} />
              {/* <Route path="/schedule" component={Schedule} /> */}
            </Switch>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
