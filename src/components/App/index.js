import Footer from "../Footer";
import FullScreenMapPage from "../../routes/Map/fullscreenMap";
import Header from "../Header";
import history from "../../redux/history";
import injectSheet from "react-jss";
import LoginPage from "../../routes/Login";
import MainPage from "../../routes/Main";
import MapPage from "../../routes/Map";
import NoMatch from "../../routes/NoMatch";
import PlanagrammPage from "../../routes/Planagramm";
import React, { Component } from "react";
import ReportsPage from "../../routes/Reports";
import RetailEquipmentPageMain from "../../routes/RetailEquipment/Main/index";
import RetailEquipmentPageViewPage from "../../routes/RetailEquipment/View";
import { ConnectedRouter } from "react-router-redux";
import { Switch, Route } from "react-router-dom";
import {
  RouteEquipmentPage,
  RouteReportsPage,
  RouteMapPage,
  RouteFullScreenMapPage,
  RoutePlanagrammPage
} from "../../routes/constants";
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
    overflowX: "hidden",
    minHeight: "calc(100vh)"
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
      <div>
        <Header />
        <section className={classes.container}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/" component={MainPage} />
            </Switch>
            {/*<Switch>*/}
            {/*<Route path="/" exact component={MainPage} />*/}
            {/*<Route*/}
            {/*path={RouteEquipmentPage}*/}
            {/*exact*/}
            {/*component={RetailEquipmentPageMain}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*path={`${RouteEquipmentPage}:id`}*/}
            {/*component={RetailEquipmentPageViewPage}*/}
            {/*/>*/}

            {/*/!*<Route path={RouteReportsPage} component={ReportsPage} />*!/*/}
            {/*<Route path={`${RouteReportsPage}:id`} component={ReportsPage} />*/}

            {/*<Route path={RouteMapPage} component={MapPage} />*/}
            {/*<Route*/}
            {/*path={RouteFullScreenMapPage}*/}
            {/*component={FullScreenMapPage}*/}
            {/*/>*/}

            {/*<Route path={RoutePlanagrammPage} component={PlanagrammPage} />*/}

            {/*<Route component={NoMatch} />*/}
            {/*</Switch>*/}
          </ConnectedRouter>
        </section>

        <Footer />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
