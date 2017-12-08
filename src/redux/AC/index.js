import {
  DELETE_FRIDGES,
  EDIT_FRIDGE,
  CANCEL_FRIDGE,
  SHOW_FRIDGE,
  LOAD_ALL_FRIDGES,
  SELECT_FRIDGE,
  SELECT_ALL_FRIDGES,
  ORDER_BY
} from "../constants";

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
 * Создает экшн для отмены просмотра/редактирования оборудования
 * @return {Object} объект экшена
 */
export function cancelFridge() {
  const action = {
    type: CANCEL_FRIDGE
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
