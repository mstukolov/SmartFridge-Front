// @flow
import { START, SUCCESS } from "../constants";

import { collection } from "./fakeData";

export default store => next => action => {
  if (!action.callAPI) return next(action);

  const { callAPI, type, ...rest } = action;
  next({ ...rest, type: type + START });

  // TODO: dev only !!!!
  setTimeout(() => {
    next({ ...rest, type: type + SUCCESS, collection });
  }, 2000);

  // fetch(callAPI, { mode: "cors" })
  //   .then(function(response) {
  //     if (response.status !== 200) {
  //       console.log(
  //         "Looks like there was a problem. Status Code: " + response.status
  //       );
  //       return;
  //     }
  //     return response.json();
  //   })
  //   .then(function(collection) {
  //     // TODO: dev only !!!!
  //     setTimeout(() => {
  //       next({ ...rest, type: type + SUCCESS, collection });
  //     }, 1000);
  //   })
  //   .catch(function(err) {
  //     next({ ...rest, type: type + FAIL, err });
  //     console.log("Fetch Error :-S", err);
  //   });

  // next(action);
};
