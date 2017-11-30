import {
  DELETE_FRIDGE,
  LOAD_ALL_FRIDGES,
  LOAD_FRIDGE,
  SELECT_FRIDGE,
  SELECT_ALL_FRIDGES
} from "../constants";

/**
 * Создает экшн удаления стаьи по id
 * @param  {string} id удаляемой статьи
 * @return {object}    объект экшена
 */
export function deleteFridge(id) {
  const action = {
    type: DELETE_FRIDGE,
    payload: {
      id
    }
  };

  return action;
}

/**
 * Создает экшн выбора оборудования из списка
 * @param  {String} selected массив выбранных  холодильников
 * @return {Object}         объект экшена
 */
export function selectFridge(newSelected) {
  const action = {
    type: SELECT_FRIDGE,
    payload: {
      newSelected
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
 * @return {object} объект экшена
 */
export function callAllFridges() {
  const action = {
    type: LOAD_ALL_FRIDGES,
    callAPI: "http://localhost:3001/api/FRIDGE"
  };

  return action;
}

// /**
//  * Создает экшн для запроса текста статьи
//  * @return {object} объект экшена
//  */
// export function loadFRIDGE(id) {
//   const action = {
//     type: LOAD_FRIDGE,
//     payload: { id },
//     callAPI: `http://localhost:3001/api/FRIDGE/${id}`
//   };
//
//   return action;
// }
