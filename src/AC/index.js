import { DELETE_FRIDGE, LOAD_ALL_FRIDGES, LOAD_FRIDGE } from "../constants";

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
// /**
//  * Создает экшн выбора статей из селекта
//  * @param  {array} selected массив выбранных статей
//  * @return {object}         объект экшена
//  */
// export function selectFRIDGEs(selected) {
//   const action = {
//     type: CHANGE_SELECTION,
//     payload: {
//       selected
//     }
//   };
//
//   return action;
// }

/**
 * Создает экшн для запроса всех статей
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
