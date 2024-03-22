import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewDeo: {},
  deoModal: false,
  reports: [],
  deoBlocks: [],
  deoWards: [],
  deoAppModal: false,
  deoAppDetails: {},
  religions: [],
  countries: [],
  states: [],
  jobs: [],
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
    setDeoApp: (state, action) => {
      state.deoAppDetails = action.payload;
      state.deoAppModal = true;
    },
    unsetDeoApp: (state, action) => {
      state.deoAppDetails = {};
      state.deoAppModal = false;
    },
    setReligions: (state, action) => {
      state.religions = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
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
  setDeoApp,
  unsetDeoApp,
  setReligions,
  setCountries,
  setStates,
  setJobs,
} = deoSlice.actions;
export default deoSlice.reducer;
