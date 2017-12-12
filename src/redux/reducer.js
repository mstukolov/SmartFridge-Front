import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import fridges from "../ducks/RetailEquipment/table";
import fridgeForm from "../ducks/RetailEquipment/form";

import vocabulary from "../ducks/vocabulary";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  router: routerReducer,
  fridges,
  fridgeForm,
  vocabulary
});
