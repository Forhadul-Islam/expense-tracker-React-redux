import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/transactions/filters/filtersSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters: filterReducer,
  },
});

export default store;
