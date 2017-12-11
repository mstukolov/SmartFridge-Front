import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import fridges from "../../ducks/mainTable";
import fridgeForm from "../../ducks/fridgeForm";

import vocabulary from "../../ducks/vocabulary";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  router,
  fridges,
  fridgeForm,
  vocabulary
});
