// eslint-disable-next-line
import { SHOW_FRIDGE, EDIT_FRIDGE, CANCEL_FRIDGE } from "../constants";
import { Record, Map } from "immutable";
import history from "../history";

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
      return formData.setIn(["edit"], false);

    case EDIT_FRIDGE:
      return formData.setIn(["edit"], true);

    case CANCEL_FRIDGE:
      history.push("/schedule");
      //TODO: вынести
      return formData.setIn(["edit"], false);

    default:
      return formData;
  }
};
