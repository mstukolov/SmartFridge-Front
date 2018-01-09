import { all } from "redux-saga/effects";
import { saga as equipmentSaga } from "../ducks/RetailEquipment/equipment";
import { saga as moreInfoSaga } from "../ducks/RetailEquipment/moreInfo";
import { saga as locationSaga } from "../ducks/RetailEquipment/location";
import { saga as reportsSaga } from "../ducks/RetailEquipment/report";

export default function* rootSaga() {
  yield all([equipmentSaga(), moreInfoSaga(), locationSaga(), reportsSaga()]);
}
