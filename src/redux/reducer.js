import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import equipment from "../ducks/RetailEquipment/table";
import equipmentForm from "../ducks/RetailEquipment/form";
import equipmentLocation from "../ducks/RetailEquipment/location";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  router: routerReducer,
  equipment,
  equipmentForm,
  equipmentLocation
});
