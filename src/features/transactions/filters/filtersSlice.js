import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  type: "All",
  pagination: {
    currentPage: 1,
    limit: 5,
    totalCount: 1,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    typeChanged: (state, action) => {
      state.type = action.payload;
    },
    searched: (state, action) => {
      state.search = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export default filtersSlice.reducer;
export const { searched, setCurrentPage, setLimit, typeChanged } =
  filtersSlice.actions;
