// eslint-disable-next-line
import { ORDER_BY } from "../constants";
import { Record, Map } from "immutable";

const FiltersModel = new Record({
  orderData: new Map({
    order: "asc",
    orderBy: "model"
  }),
  dateRange: new Map()
});

let defaultFilters = new FiltersModel();

// Проверяем наличие данных сорировки в локальном хранилище
if (localStorage.getItem("orderData")) {
  defaultFilters = defaultFilters.setIn(
    ["orderData"],
    new Map(JSON.parse(localStorage.getItem("orderData")))
  );
}

/**
 * Редьюссер хранения и обработки данных фильтрации
 * @param  {object} [filters=defaultFilters] принимает объект для работы с фильтрами
 * @param  {object} action                   обект экшена
 * @return {object}                          параметры фильтрации
 */
export default (filters = defaultFilters, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_BY:
      const { property } = payload;

      let order = "desc";

      if (
        filters.getIn(["orderData", "orderBy"]) === property &&
        filters.getIn(["orderData", "order"]) === "desc"
      ) {
        order = "asc";
      }

      const newFilters = filters
        .setIn(["orderData", "order"], order)
        .setIn(["orderData", "orderBy"], property);

      localStorage.setItem(
        "orderData",
        JSON.stringify(newFilters.get("orderData").toJS())
      );
      return newFilters;
    //
    // case CHANGE_SELECTION:
    //   return filters.setIn(["selected"], payload.selected);

    default:
      return filters;
  }
};
