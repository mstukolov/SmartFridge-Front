import { all } from "redux-saga/effects";
import { saga as equipmentSaga } from "../ducks/RetailEquipment/equipment";
import { saga as moreInfoSaga } from "../ducks/RetailEquipment/moreInfo";
import { saga as locationSaga } from "../ducks/RetailEquipment/location";
import { saga as chainsSaga } from "../ducks/RetailEquipment/chains";
import { saga as storesSaga } from "../ducks/RetailEquipment/stores";
import { saga as reportsSaga } from "../ducks/RetailEquipment/report";
import { saga as planagrammSaga } from "../ducks/Planagramm";

export default function* rootSaga() {
  yield all([
    equipmentSaga(),
    moreInfoSaga(),
    locationSaga(),
    chainsSaga(),
    storesSaga(),
    reportsSaga(),
    planagrammSaga()
  ]);
}
