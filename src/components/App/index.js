import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import MainPage from "../routes/Main";
import RetailEquipmentPageMain from "../routes/RetailEquipment/Main/index";
import RetailEquipmentPageViewPage from "../routes/RetailEquipment/View";
import injectSheet from "react-jss";
import { ConnectedRouter } from "react-router-redux";
import history from "../../redux/history";
import moment from "moment/min/moment-with-locales";
import Moment from "react-moment";
// Sets the moment instance to use.
Moment.globalMoment = moment;

// Set the locale for every react-moment instance to French.
Moment.globalLocale = "ru";

// Set the output format for every react-moment instance.
Moment.globalFormat = "D MMM YYYY";

// Use a <span> tag for every react-moment instance.
Moment.globalElement = "span";

const styles = {
  container: {
    boxSizing: "border-box",
    padding: "76px 12px",
    overflowY: "auto",
    overflowX: "hidden"
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
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/schedule" component={RetailEquipmentPageMain} />
              <Route
                path="/RetailEquipmentPageView"
                component={RetailEquipmentPageViewPage}
              />
            </Switch>
          </ConnectedRouter>
        </section>

        <Footer />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
