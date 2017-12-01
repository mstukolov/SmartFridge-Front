import { ORDER_BY } from "../constants";
import { Record, Map } from "immutable";

const FiltersModel = new Record({
  orderData: new Map({
    order: "asc",
    orderBy: "model"
  }),
  dateRange: new Map()
});

const defaultFilters = new FiltersModel();

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

      const orderBy = property;
      let order = "desc";

      if (
        filters.getIn(["orderData", "orderBy"]) === property &&
        filters.getIn(["orderData", "order"]) === "desc"
      ) {
        order = "asc";
      }

      return filters
        .setIn(["orderData", "order"], order)
        .setIn(["orderData", "orderBy"], property);
    //
    // case CHANGE_SELECTION:
    //   return filters.setIn(["selected"], payload.selected);

    default:
      return filters;
  }
};
