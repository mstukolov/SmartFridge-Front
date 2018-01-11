import { all, takeEvery, put } from "redux-saga/effects";
import { appName } from "../../config";
import { OrderedMap, Record } from "immutable";
import { location as items } from "../../fakeData";
import { createSelector } from "reselect";
import getStringPopup from "../../components/GlobalMap/popup";
import redMarker from "../../components/GlobalMap/redMarker";
import blueMarker from "../../components/GlobalMap/blueMarker";

/**
 * Constants
 * */
export const moduleName = "location";
const prefix = `${appName}/${moduleName}`;

export const LOAD_REQUEST = `${prefix}/LOAD_REQUEST`;
export const LOAD_START = `${prefix}/LOAD_START`;
export const LOAD_SUCCESS = `${prefix}/LOAD_SUCCESS`;
export const LOAD_ERROR = `${prefix}/LOAD_ERROR`;
export const SHOW_FULLSCREEN = `${prefix}/SHOW_FULLSCREEN`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  items: new OrderedMap({}),
  fullscreen: false,
  loading: false
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_START:
      return state.set("loading", true);
    case LOAD_SUCCESS:
      return state
        .set("loading", false)
        .setIn(["items"], new OrderedMap(payload.items));

    case LOAD_ERROR:
      return state.setIn(["error"], payload.error).set("loading", false);

    case SHOW_FULLSCREEN:
      return state.set("fullscreen", payload.isVisible);

    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];

// селектор индикатора загрузки
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
);

// селектор точек для карты
const markerSelectorGetter = state => state[moduleName].get("items");
const selectedItemsGetter = state => state.equipment.get("selected");
const fridgesGetter = state => state.equipment.get("items");
export const markerSelector = createSelector(
  markerSelectorGetter,
  selectedItemsGetter,
  fridgesGetter,
  (markers, selectedItems, fridges) => {
    return markers.map(item => {
      const fridge = fridges.get(item.id);

      let element = {
        position: [item.lat, item.lng]
      };

      // Создаем попап, если есть полная информация об устройстве
      if (fridge) {
        element.popup = getStringPopup(fridge);
      }

      // Если в списке выбранных точек есть данная, выделяем ее красным маркером
      if (selectedItems.get(item.id)) {
        element.options = { icon: redMarker };
      } else {
        element.options = { icon: blueMarker };
      }
      return element;
    });
  }
);

/**
 * Action Creators
 * */

/**
 * Создает экшн выбора всего оборудования из списка
 * @return {Object}         объект экшена
 */
export function loadAll() {
  const action = {
    type: LOAD_REQUEST
  };

  return action;
}

/**
 * Изменяет режим просмотра карты
 * @param {Boolean} isVisible признак отображения карты на весть экран
 * @return {Object}         объект экшена
 */
export function showFullScreen(isVisible) {
  const action = {
    type: SHOW_FULLSCREEN,
    payload: { isVisible }
  };

  return action;
}
/**
 * Sagas
 * */
export const loadLocationSaga = function*(action) {
  // const { items } = action.payload;

  yield put({
    type: LOAD_START
  });

  let promise = new Promise(function(resolve) {
    setTimeout(() => {
      resolve(items);
    }, 2000);
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");
    const locations = yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_SUCCESS,
      payload: { items: locations }
    });
  } catch (error) {
    yield put({
      type: LOAD_ERROR,
      payload: { error }
    });
  }
};

export function* saga() {
  yield all([takeEvery(LOAD_REQUEST, loadLocationSaga)]);
}
