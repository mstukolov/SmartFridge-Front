import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import history from "./history";
import { mainTable } from "../ducks/mainTable";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)
);

sagaMiddleware.run(saga);

// TODO: dev only!!!
window.store = store;

export default store;
