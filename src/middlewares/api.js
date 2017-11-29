import { START, SUCCESS, FAIL } from "../constants";

export default store => next => action => {
  if (!action.callAPI) return next(action);

  const { callAPI, type, ...rest } = action;
  next({ ...rest, type: type + START });

  let counter = 0;
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
    counter += 1;
    return {
      id: counter,
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

  const collection = [
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Honeycomb", 408, 3.2, 87, 6.5),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Jelly Bean", 375, 0.0, 94, 0.0),
    createData("KitKat", 518, 26.0, 65, 7.0),
    createData("Lollipop", 392, 0.2, 98, 0.0),
    createData("Marshmallow", 318, 0, 81, 2.0),
    createData("Nougat", 360, 19.0, 9, 37.0),
    createData("Oreo", 437, 18.0, 63, 4.0)
  ];

  setTimeout(() => {
    next({ ...rest, type: type + SUCCESS, collection });
  }, 3000);

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
