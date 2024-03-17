import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
  reportData: [],
  reportAllData: [],
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
  },
});

export const {
  setReport,
  setReportData,
  setReportAllData,
} = reportSlice.actions;
export default reportSlice.reducer;
