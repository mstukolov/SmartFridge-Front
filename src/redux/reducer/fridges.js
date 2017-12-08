import {
  DELETE_FRIDGES,
  EDIT_FRIDGE,
  SHOW_FRIDGE,
  LOAD_ALL_FRIDGES,
  LOAD_FRIDGE,
  SELECT_FRIDGE,
  SELECT_ALL_FRIDGES,
  START,
  SUCCESS
} from "../constants";
import { Record, List, Map } from "immutable";
import history from "../history";

let DefaulrReducerState = new Record({
  isLoading: false,
  collection: new List([]),
  selected: new Map({})
});

const FridgeModel = Record({
  id: null,
  model: null,
  serial: null,
  type: null,
  front: null,
  completeness: null,
  cost: null,
  location: null,
  date: null,
  additionalInformation: null
});

const defaultState = new DefaulrReducerState();

/**
 * Редьюсер для устройств(холодильников)
 * @param  {object} [state] Десереализуем список статей и делаем значение по умолчанию
 * @param  {object} action обект экшена
 * @return {Record}        immutable-экземпляр стэйта
 */
export default (state = defaultState, action) => {
  const { type, payload, collection } = action;
  const { selected } = state;

  switch (type) {
    case LOAD_ALL_FRIDGES + START:
      return state.set("isLoading", true);

    case LOAD_ALL_FRIDGES + SUCCESS:
      return state.set("isLoading", false).set("collection", collection);

    case SELECT_FRIDGE:
      const { item } = payload;

      if (selected.has(item.id)) {
        return state.setIn(["selected"], selected.delete(item.id));
      }

      return state.setIn(["selected"], selected.set(item.id, item));

    case SELECT_ALL_FRIDGES:
      if (state.collection.length === state.selected.size)
        return state.setIn(["selected"], new Map({}));
      let result = {};

      state.collection.forEach(item => {
        result[item.id] = item;
      });
      return state.setIn(["selected"], new Map(result));

    case DELETE_FRIDGES:
      let newCollection = state.collection.filter(item => {
        return !state.selected.includes(item);
      });

      return state
        .setIn(["collection"], newCollection)
        .setIn(["selected"], new Map({}));

    case SHOW_FRIDGE:
    case EDIT_FRIDGE:
      history.push("/device");

      return state;

    default:
      return state;
  }
};
