import { ORDER_BY } from "../constants";
import { Record, Map } from "immutable";

const FiltersModel = new Record({
  order: new Map({
    type: "asc",
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
      return filters;
    //
    // case CHANGE_SELECTION:
    //   return filters.setIn(["selected"], payload.selected);

    default:
      return filters;
  }
};
