import {
  DELETE_FRIDGE,
  LOAD_ALL_FRIDGES,
  LOAD_FRIDGE,
  SELECT_FRIDGE,
  SELECT_ALL_FRIDGES,
  START,
  SUCCESS
} from "../constants";
import { Record, List, Map } from "immutable";

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
  date: null
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
      const { newSelected } = payload;

      if (selected.has(newSelected)) {
        return state.setIn(["selected"], selected.delete(newSelected));
      }

      return state.setIn(["selected"], selected.set(newSelected, true));

    case SELECT_ALL_FRIDGES:
      if (state.collection.length === state.selected.size)
        return state.setIn(["selected"], new Map({}));
      let result = {};

      state.collection.forEach(item => {
        result[item.id] = true;
      });
      return state.setIn(["selected"], new Map(result));
    //
    // case LOAD_FRIDGE + SUCCESS:
    //   return state
    //     .setIn(["collection", payload.id, "isLoading"], false)
    //     .setIn(
    //       ["collection", payload.id],
    //       new FridgeModel({ ...collection, isLoaded: true })
    //     );
    //
    // case DELETE_FRIDGE:
    //   return state.deleteIn(["collection", payload.id]);
    //
    // case ADD_COMMENT:
    //   const { randomId } = action;
    //   const { FRIDGEId } = payload.newComment;
    //   return state.updateIn(["collection", FRIDGEId, "comments"], comments =>
    //     comments.concat(randomId)
    //   );

    default:
      return state;
  }
};
