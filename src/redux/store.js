import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import history from "./history";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import persistState from "redux-localstorage";
import { persistConfig } from "./persistConfig";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, routerMiddleware(history), logger),
  persistState(["auth", "equipment", "chains", "stores"], persistConfig)
);

sagaMiddleware.run(saga);

// TODO: dev only!!!
window.store = store;

export default store;
