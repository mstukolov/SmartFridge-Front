// eslint-disable-next-line
import { Record } from "immutable";

const VocabularyModel = new Record({
  models: [
    { name: "Зил", id: 1 },
    { name: "Морозко", id: 2 },
    { name: "Атлант", id: 3 },
    { name: "Свияга", id: 0 }
  ],
  types: [
    { name: "Какой-то тип", id: 1 },
    { name: "Какой-то особенный тип ", id: 2 },
    { name: "Какой-то другой тип", id: 3 },
    { name: "Супер-тип", id: 0 }
  ],
  front: [
    { name: "Стекло", id: 1 },
    { name: "С подсветкой", id: 2 },
    { name: "Железный", id: 3 },
    { name: "Дубовая дверь с замком", id: 0 }
  ]
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
