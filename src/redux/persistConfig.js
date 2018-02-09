import { ReducerRecord as StoreRecord } from "../ducks/RetailEquipment/stores";
import { List, Map } from "immutable";
import { ReducerRecord as AuthRecord } from "../ducks/Auth";
import { DefaulrReducerState as EquipmentRecord } from "../ducks/RetailEquipment/equipment";
import { ReducerRecord as LocationRecord } from "../ducks/RetailEquipment/location";
import { ReducerRecord as ChainRecord } from "../ducks/RetailEquipment/chains";

export const persistConfig = {
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
