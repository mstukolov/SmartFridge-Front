import { combineReducers } from "redux";
import fridges from "./fridges";
import fridgeForm from "./fridgeForm";
import filters from "./filters";
import vocabulary from "./vocabulary";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  fridges,
  fridgeForm,
  filters,
  vocabulary
});
