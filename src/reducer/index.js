import { combineReducers } from "redux";
import fridges from "./fridges";
import filters from "./filters";

/**
 * Подключение редьюсеров
 */
export default combineReducers({
  fridges,
  filters
});
