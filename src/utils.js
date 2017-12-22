import { Map } from "immutable";
/**
 * Преобразуем массив в обект с ключами в виде id
 * @param  {Array} arr массив с обектами с полем id
 * @param  {Object} Model модель иммутабельных данных
 * @return {Object}    обект с хэш-ключами из id
 */
export function arrayToMap(arr, Model) {
  // console.log("arrayToMap");
  if (arr)
    return arr.reduce(
      (acc, entry) => acc.set(entry.id, Model ? new Model(entry) : entry),
      new Map({})
    );
  return null;
}

/**
 * Преобразуем обект в массив объектов
 * @param  {Object} map экземпляр иммутабельной коллекции
 * @return {Array}      массив с обектами с полем id
 */
export function mapToArray(map) {
  // console.log("mapToArray");
  return map.valueSeq().toArray();
}

/**
 * Генерирует уникальный id
 * @param  {Number} num колличество симоволов в ключе
 * @return {String}     уникальный ключ
 */
export function makeid(num) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < num; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/**
 * Генерирует случайное число
 * @param  {Number} min минимальное значение
 * @param  {Number} max максимальное значение
 * @return {Number}     число
 */
export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

/**
 * Получаем имя по id
 * @param  {String} id идентификатор
 * @param  {Array} arr массив объектов с полями name, id
 * @return {String} имя по id
 */
export function getName(id, arr) {
  let name = "";
  try {
    name = arr.find(item => item.id === id).name;
  } catch (e) {
    name = "Нет данных";
  }
  return name;
}
