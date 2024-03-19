import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
  reportData: [],
  reportAllData: [],
  search: {},
  deoFilter: {},
};

const reportSlice = createSlice({
  name: "reports",
  initialState: initialState,
  reducers: {
    setReport: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    },
    setReportData: (state, action) => {
      state.reportData = action.payload;
    },
    setReportAllData: (state, action) => {
      state.reportAllData = action.payload;
    },
    setSearch: (state, action) => {
      state.search = JSON.stringify(action.payload.search);
      state.deoFilter = JSON.stringify(action.payload.deoFilter);
      localStorage.setItem("search", state.search);
      localStorage.setItem("filter", state.deoFilter);
    },
    unsetSearch: () => {
      localStorage.removeItem("search");
      localStorage.removeItem("filter");
    },
  },
});

export const {
  setReport,
  setReportData,
  setReportAllData,
  setSearch,
  unsetSearch,
} = reportSlice.actions;
export default reportSlice.reducer;
