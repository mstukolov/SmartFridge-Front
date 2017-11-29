import {
  DELETE_FRIDGE,
  LOAD_ALL_FRIDGES,
  LOAD_FRIDGE,
  START,
  SUCCESS
} from "../constants";

import { Record, Map } from "immutable";
let DefaulrReducerState = new Record({
  isLoading: false,
  collection: new Map({})
});
const FridgeModel = Record({
  id: null,
  date: null,
  title: null,
  text: null,
  comments: [],
  isLoading: false,
  isLoaded: false
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

  switch (type) {
    case LOAD_ALL_FRIDGES + START:
      return state.set("isLoading", true);

    case LOAD_ALL_FRIDGES + SUCCESS:
      return state.set("isLoading", false).set("collection", collection);

    // case LOAD_FRIDGE + START:
    //   return state.setIn(["collection", payload.id, "isLoading"], true);
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
