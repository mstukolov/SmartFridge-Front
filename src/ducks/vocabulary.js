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
    id_1: "Какой-то тип",
    id_2: "Какой-то особенный тип",
    id_3: "Какой-то другой тип",
    id_4: "Супер-тип"
  }),

  front: new Map({
    id_1: "Стекло",
    id_2: "С подсветкой",
    id_3: "Железный",
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
  const { type, payload } = action;
  switch (type) {
    default:
      return vocabulary;
  }
};
