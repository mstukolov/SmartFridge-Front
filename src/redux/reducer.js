import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import equipment from "../ducks/RetailEquipment/equipment";
import moreInfo from "../ducks/RetailEquipment/moreInfo";
import location from "../ducks/RetailEquipment/location";
import report, { moduleName } from "../ducks/RetailEquipment/report";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  router: routerReducer,
  equipment,
  moreInfo,
  location,
  [moduleName]: report
});
