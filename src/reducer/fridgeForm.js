// eslint-disable-next-line
import { SELECT_FRIDGE } from "../constants";
import { Record, Map } from "immutable";
import { makeid } from "../utils";

const FridgeFormModel = new Record({
  activeItem: {}
});

let defaultForm = new FridgeFormModel();
console.log("defaultForm", defaultForm);
/**
 * Редьюссер хранения и обработки данных в форме просмотра/редактирования данных об устройстве
 * @param  {object} [formData=defaultForm] принимает объект для работы с фильтрами
 * @param  {object} action                   обект экшена
 * @return {object}                          параметры фильтрации
 */
export default (formData = defaultForm, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_FRIDGE:
      const { item } = payload;
      return formData.set("activeItem", item);

    default:
      return formData;
  }
};
