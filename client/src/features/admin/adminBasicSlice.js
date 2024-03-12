import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

const adminBasicSlice = createSlice({
  name: "adminBasic",
  initialState: initialState,
  reducers: {
    details: (state, action) => {
      state.admin = action.payload;
    },
    resetAdminBasic: () => {
      initialState;
    },
    updateDetails: (state, action) => {
      const name = action.payload.name;
      const email = action.payload.email;
      state.admin = { ...state.admin, name: name, mail: email };
    },
  },
});

export const { details, resetAdminBasic, updateDetails } =
  adminBasicSlice.actions;
export default adminBasicSlice.reducer;
