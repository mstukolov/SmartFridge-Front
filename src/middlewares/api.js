import { START, SUCCESS, FAIL } from "../constants";
import { makeid } from "../utils";

export default store => next => action => {
  if (!action.callAPI) return next(action);

  const { callAPI, type, ...rest } = action;
  next({ ...rest, type: type + START });

  /**
   * Создает экземпляр оборудования для таблицы
   * @param  {String} model                   модель
   * @param  {String} serial                  серийный номер
   * @param  {String} type                    тип
   * @param  {String} front                   тип фронтальной плоскости
   * @param  {String} [completeness="Полная"] комплектность
   * @param  {Number} [cost=999999]           стоимость
   * @param  {String} [location="Москва"]     расположение
   * @param  {Date}   [date=new               Date(]        Дата
   * @return {[type]}                         [description]
   */
  function createData(
    model,
    serial,
    type,
    front,
    completeness = "Полная",
    cost = 999999,
    location = "Москва",
    date = new Date()
  ) {
    return {
      id: makeid(6),
      model,
      serial,
      type,
      front,
      completeness,
      cost,
      location,
      date
    };
  }

  const collection = [];

  for (var i = 0; i < 100000; i++) {
    collection.push(createData("Oreo_" + i, 437, 18.0, 63, 4.0));
  }
  // TODO: dev only !!!!
  setTimeout(() => {
    next({ ...rest, type: type + SUCCESS, collection });
  }, 1500);

  // fetch(callAPI, { mode: "cors" })
  //   .then(function(response) {
  //     if (response.status !== 200) {
  //       console.log(
  //         "Looks like there was a problem. Status Code: " + response.status
  //       );
  //       return;
  //     }
  //     return response.json();
  //   })
  //   .then(function(collection) {
  //     // TODO: dev only !!!!
  //     setTimeout(() => {
  //       next({ ...rest, type: type + SUCCESS, collection });
  //     }, 1000);
  //   })
  //   .catch(function(err) {
  //     next({ ...rest, type: type + FAIL, err });
  //     console.log("Fetch Error :-S", err);
  //   });

  // next(action);
};
