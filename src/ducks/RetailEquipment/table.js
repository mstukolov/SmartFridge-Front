import { appName } from "../../config";
import { Record, Map, OrderedMap } from "immutable";
import { createSelector } from "reselect";
import {
  equipment as collection,
  tradePoint,
  commercialNetwork
} from "../../fakeData";
import history from "../../redux/history";
import { all, takeEvery, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { RouteEquipmentPage } from "../../components/routes/constants";

/**
 * Constants
 * */
export const moduleName = "mainTable";
const prefix = `${appName}/${moduleName}`;

export const SHOW_EQUIPMENT_REQUEST = `${prefix}/SHOW_EQUIPMENT_REQUEST`;
export const LOAD_ALL_EQUIPMENT_REQUEST = `${prefix}/LOAD_ALL_EQUIPMENT_REQUEST`;
export const LOAD_ALL_EQUIPMENT_START = `${prefix}/LOAD_ALL_EQUIPMENT_START`;
export const LOAD_ALL_EQUIPMENT_SUCCESS = `${prefix}/LOAD_ALL_EQUIPMENT_SUCCESS`;
export const LOAD_ALL_EQUIPMENT_ERROR = `${prefix}/LOAD_ALL_EQUIPMENT_ERROR`;

export const DELETE_EQUIPMENT_REQUEST = `${prefix}/DELETE_EQUIPMENT_REQUEST`;
export const DELETE_EQUIPMENT_START = `${prefix}/DELETE_EQUIPMENT_START`;
export const DELETE_EQUIPMENT_SUCCESS = `${prefix}/DELETE_EQUIPMENT_SUCCESS`;
export const DELETE_EQUIPMENT_ERROR = `${prefix}/DELETE_EQUIPMENT_ERROR`;

export const SELECT_EQUIPMENT = `${prefix}/SELECT_EQUIPMENT`;
export const SELECT_ALL_EQUIPMENT = `${prefix}/SELECT_ALL_EQUIPMENT`;

export const ORDER_BY = `${prefix}/ORDER_BY`;
export const FILTER_BY = `${prefix}/FILTER_BY`;

/**
 * Reducer
 * */
let DefaulrReducerState = new Record({
  isLoading: false,
  collection: new OrderedMap({}),
  commercialNetwork: null,
  tradePoint: null,
  selected: new Map({}),
  orderData: new Map({
    order: "asc",
    orderBy: "model"
  }),
  filters: new Map({
    commercialNetwork: "",
    tradePoint: ""
  }),
  error: null
});

const defaultState = new DefaulrReducerState();

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  const { selected } = state;

  switch (type) {
    case LOAD_ALL_EQUIPMENT_START:
      return state.set("isLoading", true);

    case LOAD_ALL_EQUIPMENT_SUCCESS:
      return state
        .set("isLoading", false)
        .set("collection", new OrderedMap(payload.collection))
        .set("commercialNetwork", new Map(commercialNetwork))
        .set("tradePoint", new Map(tradePoint));

    case LOAD_ALL_EQUIPMENT_ERROR:
      return state.setIn(["error"], payload.error).set("isLoading", false);

    case SHOW_EQUIPMENT_REQUEST:
      return state;
    case SELECT_EQUIPMENT:
      const { item } = payload;
      let newState = null;

      if (selected.has(item.id)) {
        newState = state.setIn(["selected"], selected.delete(item.id));
      } else {
        newState = state.setIn(["selected"], selected.set(item.id, true));
      }

      localStorage.removeItem("RetailEquipmentSelected");
      // Сохраняем id выбранных в локальное хранилище
      localStorage.setItem(
        "RetailEquipmentSelected",
        JSON.stringify(newState.selected.toJS())
      );
      return newState;

    case SELECT_ALL_EQUIPMENT:
      if (state.collection.size === state.selected.size)
        return state.setIn(["selected"], new Map({}));
      let result = {};

      state.collection.forEach(item => {
        result[item.id] = true;
      });

      localStorage.removeItem("RetailEquipmentSelected");
      localStorage.setItem("RetailEquipmentSelected", JSON.stringify(result));
      return state.setIn(["selected"], new Map(result));

    case DELETE_EQUIPMENT_START:
      return state.set("isLoading", true);

    case DELETE_EQUIPMENT_SUCCESS:
      localStorage.removeItem("RetailEquipmentSelected");

      return state
        .set("isLoading", false)
        .set("collection", new OrderedMap(payload.collection))
        .setIn(["selected"], new Map({}));

    case DELETE_EQUIPMENT_ERROR:
      return state.setIn(["error"], payload.error).set("isLoading", false);

    case ORDER_BY:
      const { property } = payload;

      let order = "desc";

      if (
        state.getIn(["orderData", "orderBy"]) === property &&
        state.getIn(["orderData", "order"]) === "desc"
      ) {
        order = "asc";
      }

      const orderedState = state
        .setIn(["orderData", "order"], order)
        .setIn(["orderData", "orderBy"], property);

      // TODO: Переделать организацию хранения данных в сторэдж
      localStorage.setItem(
        "RetailEquipmentTableOrderData",
        JSON.stringify(orderedState.get("orderData").toJS())
      );
      return orderedState;

    case FILTER_BY:
      const { filter } = payload;
      let newFilter = {
        commercialNetwork: filter.commercialNetwork || "",
        tradePoint: filter.tradePoint || ""
      };
      return state.setIn(["filters"], new Map(newFilter));

    default:
      const orderDataStorage = localStorage.getItem(
        "RetailEquipmentTableOrderData"
      );

      const selectedItemsStorage = localStorage.getItem(
        "RetailEquipmentSelected"
      );

      // Достаем данные сортировки из локального хранилища
      if (orderDataStorage || selectedItemsStorage) {
        return state
          .setIn(["orderData"], new Map(JSON.parse(orderDataStorage)))
          .setIn(["selected"], new Map(JSON.parse(selectedItemsStorage)));
      }

      return state;
  }
}

/**
 * Selectors
 * */

const filtersStateGetter = state => state.equipment.get("filters");
const rowsGetter = state => state.equipment.get("collection");

export const filteredRowsSelector = createSelector(
  [filtersStateGetter, rowsGetter],
  (filters, collection) => {
    let filteredCollection = collection.toArray();
    const { commercialNetwork, tradePoint } = filters.toJS();

    if (commercialNetwork) {
      return filteredCollection.filter(item => {
        return item.commercialNetwork === commercialNetwork;
      });
    }

    if (tradePoint) {
      return filteredCollection.filter(item => {
        return item.tradePoint === tradePoint;
      });
    }

    return filteredCollection;
  }
);

const orderStateGetter = state => state.equipment.get("orderData");

export const orderedRowsSelector = createSelector(
  filteredRowsSelector,
  orderStateGetter,
  (collection, orderData) => {
    console.log(collection);
    const orderBy = orderData.get("orderBy");
    let sortedCollection = collection;

    if (orderData.get("order") === "desc") {
      return sortedCollection.sort(
        (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      );
    } else {
      return sortedCollection.sort(
        (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
      );
    } // eslint-disable-next-line
    return sortedCollection;
  }
);

/**
 * Action Creators
 * */

/**
 * Создает экшн удаления выбранных статей
 * @return {Object}    объект экшена
 */
export function deleteEquipment(deleted) {
  const action = {
    type: DELETE_EQUIPMENT_REQUEST,
    payload: { deleted }
  };

  return action;
}

/**
 * Создает экшн выбора всего оборудования из списка
 * @return {Object}         объект экшена
 */
export function selectAllEquipment() {
  const action = {
    type: SELECT_ALL_EQUIPMENT
  };

  return action;
}

/**
 * Создает экшн выбора оборудования из списка
 * @param  {String} selected массив выбранных  холодильников
 * @return {Object}         объект экшена
 */
export function selectEquipment(item) {
  const action = {
    type: SELECT_EQUIPMENT,
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
export function callAllEquipment() {
  const action = {
    type: LOAD_ALL_EQUIPMENT_REQUEST
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

/**
 * Создает сортировки по полю
 * @param  {String} id удаляемой статьи
 * @return {Object}    объект экшена
 */
export function filterEquipment(filter) {
  const action = {
    type: FILTER_BY,
    payload: {
      filter
    }
  };

  return action;
}

/**
 * Создает экшн для включения режима редактирования оборудования
 * @return {Object} объект экшена
 */
export function showEquipment(id) {
  const action = {
    type: SHOW_EQUIPMENT_REQUEST,
    payload: { id }
  };

  return action;
}

/**
 * Sagas
 */

export const loadAllSaga = function*(action) {
  // const { collection } = action.payload;

  yield put({
    type: LOAD_ALL_EQUIPMENT_START
  });

  let promise = new Promise(function(resolve) {
    resolve(collection);
  });

  yield delay(3000);

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");
    const newCollection = yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_ALL_EQUIPMENT_SUCCESS,
      payload: { collection }
    });
  } catch (error) {
    yield put({
      type: LOAD_ALL_EQUIPMENT_ERROR,
      payload: { error }
    });
  }
};

export const deleteSaga = function*(action) {
  yield put({
    type: DELETE_EQUIPMENT_START
  });

  let asyncNewCollection = new OrderedMap(collection).filter(item => {
    return !action.payload.deleted.get(item.id);
  });

  let promise = new Promise(function(resolve) {
    resolve(asyncNewCollection);
  });

  yield delay(1000);

  try {
    //TODO: Здесь сделать нормальную логику запроса данных
    // throw new Error("Ошибка отправки данных");

    const newCollection = yield promise.then(result => {
      return result;
    });

    yield put({
      type: DELETE_EQUIPMENT_SUCCESS,
      payload: { collection: newCollection }
    });
  } catch (error) {
    yield put({
      type: DELETE_EQUIPMENT_ERROR,
      payload: { error }
    });
  }
};

export const showSaga = function(action) {
  history.push(RouteEquipmentPage + ":" + action.payload.id);
};

export const saga = function*() {
  yield all([
    takeEvery(SHOW_EQUIPMENT_REQUEST, showSaga),
    takeEvery(LOAD_ALL_EQUIPMENT_REQUEST, loadAllSaga),
    takeEvery(DELETE_EQUIPMENT_REQUEST, deleteSaga)
  ]);
};
