import { appName } from "../../config";
import { Record, Map, OrderedMap } from "immutable";
import { createSelector } from "reselect";
import {
  equipment as items,
  tradePoint,
  commercialNetwork
} from "../../fakeData";
import history from "../../redux/history";
import { all, takeEvery, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { RouteEquipmentPage, RouteReportsPage } from "../../routes/constants";
import { getName } from "../../utils";

/**
 * Constants
 * */
export const moduleName = "equipment";
const prefix = `${appName}/${moduleName}`;

export const SHOW_REQUEST = `${prefix}/SHOW_REQUEST`;
export const SHOW_REPORT_REQUEST = `${prefix}/SHOW_REPORT_REQUEST`;
export const LOAD_ALL_REQUEST = `${prefix}/LOAD_ALL_REQUEST`;
export const LOAD_ALL_START = `${prefix}/LOAD_ALL_START`;
export const LOAD_ALL_SUCCESS = `${prefix}/LOAD_ALL_SUCCESS`;
export const LOAD_ALL_ERROR = `${prefix}/LOAD_ALL_ERROR`;

export const DELETE_REQUEST = `${prefix}/DELETE_REQUEST`;
export const DELETE_START = `${prefix}/DELETE_START`;
export const DELETE_SUCCESS = `${prefix}/DELETE_SUCCESS`;
export const DELETE_ERROR = `${prefix}/DELETE_ERROR`;

export const SELECT = `${prefix}/SELECT`;
export const SELECT_ALL = `${prefix}/SELECT_ALL`;

export const ORDER_BY = `${prefix}/ORDER_BY`;

export const FILTER_BY_COMMERCIAL_NETWORK = `${prefix}/FILTER_BY_COMMERCIAL_NETWORK`;
export const FILTER_BY_TRADE_POINT = `${prefix}/FILTER_BY_TRADE_POINT`;

/**
 * Reducer
 * */
let DefaulrReducerState = new Record({
  loading: false,
  items: new OrderedMap({}),
  commercialNetwork: new Map({}),
  tradePoint: new Map({}),
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
    case LOAD_ALL_START:
      return state.set("loading", true);

    case LOAD_ALL_SUCCESS:
      return state
        .set("loading", false)
        .set("items", new OrderedMap(payload.items))
        .set("commercialNetwork", new Map(commercialNetwork))
        .set("tradePoint", new Map(tradePoint));

    case LOAD_ALL_ERROR:
      return state.setIn(["error"], payload.error).set("loading", false);

    case SHOW_REQUEST:
      return state;
    case SELECT:
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

    case SELECT_ALL:
      if (state.items.size === state.selected.size)
        return state.setIn(["selected"], new Map({}));
      let result = {};

      state.items.forEach(item => {
        result[item.id] = true;
      });

      localStorage.removeItem("RetailEquipmentSelected");
      localStorage.setItem("RetailEquipmentSelected", JSON.stringify(result));
      return state.setIn(["selected"], new Map(result));

    case DELETE_START:
      return state.set("loading", true);

    case DELETE_SUCCESS:
      localStorage.removeItem("RetailEquipmentSelected");

      return state
        .set("loading", false)
        .set("items", new OrderedMap(payload.items))
        .setIn(["selected"], new Map({}));

    case DELETE_ERROR:
      return state.setIn(["error"], payload.error).set("loading", false);

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

    case FILTER_BY_COMMERCIAL_NETWORK:
      const { fieldName } = payload;
      return state
        .setIn(["filters", "commercialNetwork"], fieldName)
        .setIn(["filters", "tradePoint"], "");

    case FILTER_BY_TRADE_POINT:
      const { byField } = payload;
      return state.setIn(["filters", "tradePoint"], byField);

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

//Селектор данных торговых сетей
const commercialNetworkGetter = state =>
  state.equipment.get("commercialNetwork");

export const commercialNetworkSelector = createSelector(
  commercialNetworkGetter,
  networks => networks.toArray()
);

//Селектор данных торговых точек
const tradePointGetter = state => state.equipment.get("tradePoint");

export const tradePointSelector = createSelector(tradePointGetter, points =>
  points.toArray()
);

//Селектор данных фильтров
const filtersDataGetter = state => state.equipment.get("filters");

export const filtersDataSelector = createSelector(
  filtersDataGetter,
  filtersData => filtersData.toJS()
);

// Селектор фильтров
const filtersStateGetter = state => state.equipment.get("filters");
const rowsGetter = state => state.equipment.get("items");

export const filteredRowsSelector = createSelector(
  [filtersStateGetter, rowsGetter],
  (filters, items) => {
    let filteredCollection = items.toArray();
    const { commercialNetwork, tradePoint } = filters.toJS();

    if (commercialNetwork.length && !tradePoint.length) {
      return filteredCollection.filter(item => {
        return item.commercialNetwork === commercialNetwork;
      });
    }

    if (commercialNetwork.length && tradePoint.length) {
      return filteredCollection.filter(item => {
        return item.tradePoint === tradePoint;
      });
    }

    return filteredCollection;
  }
);

// Селектор сортировки в комбинации с фильтрами
const orderStateGetter = state => state.equipment.get("orderData");

export const orderedFilterRowsSelector = createSelector(
  filteredRowsSelector,
  commercialNetworkSelector,
  orderStateGetter,
  (items, networks, orderData) => {
    const orderBy = orderData.get("orderBy");
    let sortedCollection = items;

    switch (orderBy) {
      case "sn":
        orderData.get("order") === "desc"
          ? sortedCollection.sort().reverse()
          : sortedCollection.sort();
        return sortedCollection;

      case "tradePoint":
      case "commercialNetwork":
        return orderData.get("order") === "desc"
          ? sortedCollection.sort(
              (a, b) =>
                getName(b[orderBy], networks) < getName(a[orderBy], networks)
                  ? -1
                  : 1
            )
          : sortedCollection.sort(
              (a, b) =>
                getName(a[orderBy], networks) < getName(b[orderBy], networks)
                  ? -1
                  : 1
            );
      case "remain":
      case "refill":
      case "dateUpdate":
      default:
        orderData.get("order") === "asc"
          ? sortedCollection.sort((a, b) => b[orderBy] - a[orderBy])
          : sortedCollection.sort((a, b) => a[orderBy] - b[orderBy]);
        return sortedCollection;
    }
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
    type: DELETE_REQUEST,
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
    type: SELECT_ALL
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
    type: SELECT,
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
export function callAll() {
  const action = {
    type: LOAD_ALL_REQUEST
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
 * Создает сортировки по торговым сетям
 * @param  {String} значение фильтра
 * @return {Object}    объект экшена
 */
export function filterByNetwork(fieldName) {
  const action = {
    type: FILTER_BY_COMMERCIAL_NETWORK,
    payload: {
      fieldName
    }
  };

  return action;
}

/**
 * Создает сортировки по торговым точкам
 * @param  {String} значение фильтра
 * @return {Object}    объект экшена
 */
export function filterByPoint(fieldName) {
  const action = {
    type: FILTER_BY_TRADE_POINT,
    payload: {
      byField: fieldName
    }
  };

  return action;
}

/**
 * Создает экшн для включения режима редактирования оборудования
 * @return {Object} объект экшена
 */
export function showMoreInfo(id) {
  const action = {
    type: SHOW_REQUEST,
    payload: { id }
  };

  return action;
}

/**
 * Создает экшн для перехода в режим просмотра аналитики
 * @return {Object} объект экшена
 */
export function showReport(id) {
  const action = {
    type: SHOW_REPORT_REQUEST,
    payload: { id }
  };

  return action;
}

/**
 * Sagas
 */

export const loadAllSaga = function*(action) {
  // const { items } = action.payload;

  yield put({
    type: LOAD_ALL_START
  });

  let promise = new Promise(function(resolve) {
    resolve(items);
  });

  yield delay(3000);

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");
    yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_ALL_SUCCESS,
      payload: { items }
    });
  } catch (error) {
    yield put({
      type: LOAD_ALL_ERROR,
      payload: { error }
    });
  }
};

export const deleteSaga = function*(action) {
  yield put({
    type: DELETE_START
  });

  let asyncNewCollection = new OrderedMap(items).filter(item => {
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
      type: DELETE_SUCCESS,
      payload: { items: newCollection }
    });
  } catch (error) {
    yield put({
      type: DELETE_ERROR,
      payload: { error }
    });
  }
};

export const showSaga = function(action) {
  history.push(RouteEquipmentPage + ":" + action.payload.id);
};

export const showReportSaga = function(action) {
  history.push(RouteReportsPage + ":" + action.payload.id);
};

export const saga = function*() {
  yield all([
    takeEvery(SHOW_REQUEST, showSaga),
    takeEvery(LOAD_ALL_REQUEST, loadAllSaga),
    takeEvery(DELETE_REQUEST, deleteSaga),
    takeEvery(SHOW_REPORT_REQUEST, showReportSaga)
  ]);
};