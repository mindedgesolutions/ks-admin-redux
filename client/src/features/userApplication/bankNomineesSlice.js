import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  currentSchemes: [],
};

const bankNomineeSlice = createSlice({
  name: "bankNominee",
  initialState: initialState,
  reducers: {
    newSchemeSet: (state, action) => {
      const sendSchemes = JSON.stringify(action.payload);
      state.currentSchemes = sendSchemes;
    },
  },
});

export const { newSchemeSet } = bankNomineeSlice.actions;
export default bankNomineeSlice.reducer;
