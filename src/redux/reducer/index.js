import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import fridges from "./fridges";
import fridgeForm from "./fridgeForm";
import filters from "./filters";
import vocabulary from "./vocabulary";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  router,
  fridges,
  fridgeForm,
  filters,
  vocabulary
});
