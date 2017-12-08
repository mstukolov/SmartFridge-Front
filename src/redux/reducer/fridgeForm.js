// eslint-disable-next-line
import { SELECT_FRIDGE, SHOW_FRIDGE, WRITE_FRIDGE } from "../constants";
import { Record, Map } from "immutable";

const FridgeFormModel = new Record({
  activeItem: {},
  edit: false
});

let defaultForm = new FridgeFormModel();

/**
 * Редьюссер хранения и обработки данных в форме просмотра/редактирования данных об устройстве
 * @param  {object} [formData=defaultForm] принимает объект для работы с фильтрами
 * @param  {object} action                   обект экшена
 * @return {object}                          параметры фильтрации
 */
export default (formData = defaultForm, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_FRIDGE:
      const { edit } = payload;
      return formData.setIn(["edit"], edit);

    // localStorage.setItem(activeItem, item)

    // return formData.set("activeItem", item);

    default:
      return formData;
  }
};
