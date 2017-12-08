import { createSelector } from "reselect";

const rowsGetter = state => state.fridges.get("collection");
const orderFiltersGetter = state => state.filters.get("orderData");

export const orderedRowsSelector = createSelector(
  rowsGetter,
  orderFiltersGetter,
  (collection, orderData) => {
    const orderBy = orderData.get("orderBy");

    if (orderData.get("order") === "desc") {
      return collection.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1));
    } else {
      return collection.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    } // eslint-disable-next-line
    return collection;
  }
);
