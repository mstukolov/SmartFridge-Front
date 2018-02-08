import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import history from "./history";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import { Map, List } from "immutable";
import persistState from "redux-localstorage";
import { ReducerRecord as AuthRecord } from "../ducks/Auth";
import { ReducerRecord as ChainRecord } from "../ducks/RetailEquipment/chains";
import { ReducerRecord as LocationRecord } from "../ducks/RetailEquipment/location";
import { ReducerRecord as StoreRecord } from "../ducks/RetailEquipment/stores";
import { DefaulrReducerState as EquipmentRecord } from "../ducks/RetailEquipment/equipment";

const persistConfig = {
  deserialize(serializedData) {
    try {
      const result = JSON.parse(serializedData, (key, value) => {
        if (key === "auth") return new AuthRecord().set("token", value.token);
        if (key === "equipment")
          return new EquipmentRecord()
            .setIn(
              ["orderData"],
              new Map(value.orderData).setIn(
                ["filters"],
                new Map(value.filters)
              )
            )
            .setIn(["selected"], new List(value.selected))
            .setIn(["items"], new List(value.items))
            .setIn(["selectAll"], value.selectAll);
        if (key === "chains")
          return new ChainRecord().setIn(["items"], new List(value.items));
        if (key === "stores")
          return new StoreRecord()
            .setIn(["items"], new List(value.items))
            .setIn(["filter"], value.filter);

        return value;

        if (key === "location")
          return new LocationRecord()
            .setIn(["items"], new List(value.items))
            .setIn(["fullscreen"], value.fullscreen);

        return value;
      });

      console.log("deserialize =========>", result);
      return result;
    } catch (e) {
      console.error("Ошибка десериаллизации данных из localStorage", e);
    }
  }
};

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
