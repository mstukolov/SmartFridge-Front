import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import equipment from "../ducks/RetailEquipment/equipment";
import moreInfo from "../ducks/RetailEquipment/moreInfo";
import location from "../ducks/RetailEquipment/location";
import chains from "../ducks/RetailEquipment/chains";
import stores from "../ducks/RetailEquipment/stores";
import report, { moduleName } from "../ducks/RetailEquipment/report";
import planagramm from "../ducks/Planagramm";
import auth from "../ducks/Auth";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  router: routerReducer,
  equipment,
  moreInfo,
  location,
  chains,
  stores,
  [moduleName]: report,
  planagramm,
  auth
});
