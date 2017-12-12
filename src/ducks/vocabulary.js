// eslint-disable-next-line
import { Record, Map } from "immutable";

const VocabularyModel = new Record({
  models: new Map({
    id_1: "Зил",
    id_2: "Морозко",
    id_3: "Атлант",
    id_4: "Свияга"
  }),
  types: new Map({
    id_1: "Абсолютны ноль",
    id_2: "Сибирский мороз",
    id_3: "Арктический холод",
    id_4: "Как в погребе"
  }),

  front: new Map({
    id_1: "Барельеф с лицами вождей",
    id_2: "Иллюминатор",
    id_3: "Стекло с решеткой",
    id_4: "Дубовая дверь с замком"
  })
});

let defaultVocabulary = new VocabularyModel();

/**
 * Редьюссер хранения и обработки данных в словаря
 * @param  {object} [vocabulary=defaultVocabulary] принимает объект для работы со словарем
 * @param  {object} action                   обект экшена
 * @return {object}                          набор данных для расшифровки полей по id
 */
export default (vocabulary = defaultVocabulary, action) => {
  const { type } = action;
  switch (type) {
    default:
      return vocabulary;
  }
};
