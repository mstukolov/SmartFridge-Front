import { all } from "redux-saga/effects";
import { saga as mainTableSaga } from "../ducks/mainTable";

export default function* rootSaga() {
  yield all([mainTableSaga()]);
}
