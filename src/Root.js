import React, { Component } from "react";
import App from "./components/App/index";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";
import grey from "material-ui/colors/grey";
import history from "./redux/history";
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey
  },
  status: {
    danger: "orange"
  }
});

/**
 * Компонент обвязки для роутера
 * @extends Component
 */
class Root extends Component {
  /**
   * render
   * @return {ReactElement} разметка
   */
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default Root;
