import React, { Component } from "react";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";
import grey from "material-ui/colors/grey";
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey
  },
  status: {
    danger: "orange"
  }
});

// .dark-primary-color    { background: #0288D1; }
// .default-primary-color { background: #03A9F4; }
// .light-primary-color   { background: #B3E5FC; }
// .text-primary-color    { color: #FFFFFF; }
// .accent-color          { background: #607D8B; }
// .primary-text-color    { color: #212121; }
// .secondary-text-color  { color: #757575; }
// .divider-color         { border-color: #BDBDBD; }
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
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
