import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
  reportData: [],
  reportAllData: [],
  reportDataMultiple: {},
  search: {},
  deoFilter: {},
  deoLabels: {},
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
    unsetReportData: (state) => {
      state.reportData = [];
    },
    setReportDataMultiple: (state, action) => {
      state.reportDataMultiple = action.payload;
    },
    unsetReportDataMultiple: (state) => {
      state.reportDataMultiple = {};
    },
    setReportAllData: (state, action) => {
      state.reportAllData = action.payload;
    },
    setSearch: (state, action) => {
      state.search = JSON.stringify(action.payload.search);
      state.deoFilter = JSON.stringify(action.payload.deoFilter);
      state.deoLabels = JSON.stringify(action.payload.deoLabels);
      localStorage.setItem("search", state.search);
      localStorage.setItem("filter", state.deoFilter);
      localStorage.setItem("labels", state.deoLabels);
    },
    unsetSearch: (state) => {
      state.search = {};
      state.deoFilter = {};
      state.deoLabels = {};
      localStorage.removeItem("search");
      localStorage.removeItem("filter");
      localStorage.removeItem("labels");
    },
  },
});

export const {
  setReport,
  setReportData,
  unsetReportData,
  setReportDataMultiple,
  unsetReportDataMultiple,
  setReportAllData,
  setSearch,
  unsetSearch,
} = reportSlice.actions;
export default reportSlice.reducer;
