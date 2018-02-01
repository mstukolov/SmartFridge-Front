import Footer from "../Footer";
import FullScreenMapPage from "../../routes/Map/fullscreenMap";
import Header from "../Header";
import history from "../../redux/history";
import injectSheet from "react-jss";
import LoginPage from "../../routes/Login";
import MainPage from "../../routes/Main";
import UserProfile from "../../routes/UserProfile";
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
  EQUIPMENT_PAGE,
  REPORTS_PAGE,
  MAP_PAGE,
  FULL_SCREEN_MAP_PAGE,
  PLANAGRAMM_PAGE,
  PROFILE_PAGE,
  LOGIN_PAGE
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
              <Route path={LOGIN_PAGE} component={LoginPage} />

              <Route path={PROFILE_PAGE} component={UserProfile} />

              <Route
                path={EQUIPMENT_PAGE}
                component={RetailEquipmentPageMain}
              />
              <Route
                path={`${EQUIPMENT_PAGE}:id`}
                component={RetailEquipmentPageViewPage}
              />
              <Route path={REPORTS_PAGE} component={ReportsPage} />

              <Route path={`${REPORTS_PAGE}:id`} component={ReportsPage} />

              <Route path={MAP_PAGE} component={MapPage} />

              <Route
                path={FULL_SCREEN_MAP_PAGE}
                component={FullScreenMapPage}
              />

              <Route path={PLANAGRAMM_PAGE} component={PlanagrammPage} />
              <Route exact path="/" component={MainPage} />

              <Route component={NoMatch} />
            </Switch>
          </ConnectedRouter>
        </section>

        <Footer />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
