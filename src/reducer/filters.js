import { CHANGE_DATE_RANGE, CHANGE_SELECTION } from "../constants";
import { Record, Map } from "immutable";

const FiltersModel = new Record({
  selected: [],
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
    case CHANGE_DATE_RANGE:
      return filters.setIn(["dateRange"], payload.dateRange);

    case CHANGE_SELECTION:
      return filters.setIn(["selected"], payload.selected);

    default:
      return filters;
  }
};
