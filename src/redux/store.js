import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import history from "./history";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import persistState from "redux-localstorage";

const persistConfig = {
  slicer(paths) {
    return state => {
      console.log("state => ", state, paths);
      let subset = {};
      /*Custom logic goes here*/
      // paths.forEach((path) => {
      //     if (state[path].persistToLocalStorage)
      //         subset[path] = state[path]
      // }
      subset.auth = state.auth;

      return subset;
    };
  },
  deserialize(serializedData) {
    console.log("deserialize =========>", JSON.parse(serializedData));
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, routerMiddleware(history), logger),
  persistState(null, persistConfig)
);

sagaMiddleware.run(saga);

// TODO: dev only!!!
window.store = store;

export default store;
