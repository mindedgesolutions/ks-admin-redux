import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewDeo: {},
  deoModal: false,
  reports: [],
  deoBlocks: [],
  deoWards: [],
};

const deoSlice = createSlice({
  name: "deo",
  initialState: initialState,
  reducers: {
    setDeo: (state, action) => {
      state.viewDeo = action.payload;
      state.deoModal = true;
    },
    unsetDeo: (state) => {
      state.viewDeo = {};
      state.deoModal = false;
    },
    setReport: (state, action) => {
      state.reports = action.payload;
    },
    unsetReports: (state) => {
      state.reports = [];
    },
    setDeoBlocks: (state, action) => {
      state.deoBlocks = action.payload;
    },
    setDeoWards: (state, action) => {
      state.deoWards = action.payload;
    },
  },
});

export const {
  setDeo,
  unsetDeo,
  setReport,
  unsetReports,
  setDeoBlocks,
  setDeoWards,
} = deoSlice.actions;
export default deoSlice.reducer;
