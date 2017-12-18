import { all } from "redux-saga/effects";
import { saga as equipmentTableSaga } from "../ducks/RetailEquipment/table";
import { saga as equipmentFormSaga } from "../ducks/RetailEquipment/form";
import { saga as locationSaga } from "../ducks/RetailEquipment/location";

export default function* rootSaga() {
  yield all([equipmentTableSaga(), equipmentFormSaga(), locationSaga()]);
}
