import { appName } from "../config";
import { Record, List, Map } from "immutable";
import history from "../redux/history";
import { createSelector } from "reselect";
import { collection } from "./fakeData";

/**
 * Constants
 * */
export const moduleName = "mainTable";
const prefix = `${appName}/${moduleName}`;
export const LOAD_ALL_FRIDGES = `${prefix}/LOAD_ALL_FRIDGES`;
export const LOAD_ALL_FRIDGES_START = `${prefix}/LOAD_ALL_FRIDGES_START`;
export const LOAD_ALL_FRIDGES_SUCCESS = `${prefix}/LOAD_ALL_FRIDGES_SUCCESS`;
export const DELETE_FRIDGES = `${prefix}/DELETE_FRIDGES`;
export const SELECT_FRIDGE = `${prefix}/SELECT_FRIDGE`;
export const SELECT_ALL_FRIDGES = `${prefix}/SELECT_ALL_FRIDGES`;
export const ORDER_BY = `${prefix}/ORDER_BY`;
export const SHOW_FRIDGE = `${prefix}/SHOW_FRIDGE`;
export const EDIT_FRIDGE = `${prefix}/EDIT_FRIDGE`;

/**
 * Reducer
 * */
let DefaulrReducerState = new Record({
  isLoading: false,
  collection: new List([]),
  selected: new Map({}),
  orderData: new Map({
    order: "asc",
    orderBy: "model"
  })
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

export default function reducer(state = defaultState, action) {
  const { type, payload, collection } = action;
  const { selected } = state;

  switch (type) {
    case LOAD_ALL_FRIDGES_START:
      return state.set("isLoading", true);

    case LOAD_ALL_FRIDGES_SUCCESS:
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

    case ORDER_BY:
      const { property } = payload;

      let order = "desc";

      if (
        state.getIn(["orderData", "orderBy"]) === property &&
        state.getIn(["orderData", "order"]) === "desc"
      ) {
        order = "asc";
      }

      const newstate = state
        .setIn(["orderData", "order"], order)
        .setIn(["orderData", "orderBy"], property);

      // TODO: Переделать организацию хранения данных в сторэдж
      localStorage.setItem(
        "orderData",
        JSON.stringify(newstate.get("orderData").toJS())
      );
      return newstate;
    default:
      return state;
  }
}

/**
 * Selectors
 * */
const rowsGetter = state => state.fridges.get("collection");
const orderstateGetter = state => state.fridges.get("orderData");

export const orderedRowsSelector = createSelector(
  rowsGetter,
  orderstateGetter,
  (collection, orderData) => {
    const orderBy = orderData.get("orderBy");

    if (orderData.get("order") === "desc") {
      return collection.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1));
    } else {
      return collection.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    } // eslint-disable-next-line
    return collection;
  }
);
// export const userSelector = state => state[moduleName].user

/**
 * Action Creators
 * */

/**
 * Создает экшн удаления выбранных статей
 * @return {Object}    объект экшена
 */
export function deleteFridges() {
  const action = {
    type: DELETE_FRIDGES
  };

  return action;
}

/**
 * Создает экшн для включения режима редактирования оборудования
 * @return {Object} объект экшена
 */
export function showFridge() {
  const action = {
    type: SHOW_FRIDGE
  };

  return action;
}

/**
 * Создает экшн для включения режима просмотра оборудования
 * @return {Object} объект экшена
 */
export function editFridge() {
  const action = {
    type: EDIT_FRIDGE
  };

  return action;
}

/**
 * Создает экшн выбора всего оборудования из списка
 * @return {Object}         объект экшена
 */
export function selectAllFridges() {
  const action = {
    type: SELECT_ALL_FRIDGES
  };

  return action;
}

/**
 * Создает экшн выбора оборудования из списка
 * @param  {String} selected массив выбранных  холодильников
 * @return {Object}         объект экшена
 */
export function selectFridge(item) {
  const action = {
    type: SELECT_FRIDGE,
    payload: {
      item
    }
  };
  return action;
}
/**
 * Создает экшн для запроса всех холодильников
 * @return {Object} объект экшена
 */
export function callAllFridges() {
  const action = {
    type: LOAD_ALL_FRIDGES,
    callAPI: "http://localhost:3001/api/FRIDGE"
  };

  return action;
}

/**
 * Создает сортировки по полю
 * @param  {String} id удаляемой статьи
 * @return {Object}    объект экшена
 */
export function sortOrderBy(property) {
  const action = {
    type: ORDER_BY,
    payload: {
      property
    }
  };

  return action;
}

// side effects, only as applicable
// e.g. thunks, epics, etc

export const mainTable = store => next => action => {
  if (!action.callAPI) return next(action);

  const { callAPI, type, ...rest } = action;
  next({ ...rest, type: LOAD_ALL_FRIDGES_START });

  // TODO: dev only !!!!
  setTimeout(() => {
    next({ ...rest, type: LOAD_ALL_FRIDGES_SUCCESS, collection });
  }, 2000);
};
