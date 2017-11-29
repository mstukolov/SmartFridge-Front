/**
 * Усилитель-логгер, выводит в консоль стэйт и экшт до и после изменения состояния стора
 */
export default store => next => action => {
  console.log("before --->  : ", store.getState(), action);

  next(action);

  console.log("after --->  : ", store.getState(), action);
};
