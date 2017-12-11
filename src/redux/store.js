import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import history from "./history";
import { mainTable } from "../ducks/mainTable";

// import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(mainTable, routerMiddleware(history), logger)
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);

// TODO: dev only!!!
window.store = store;

export default store;
