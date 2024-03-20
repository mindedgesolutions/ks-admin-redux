import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewDeo: {},
  deoModal: false,
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
  },
});

export const { setDeo, unsetDeo } = deoSlice.actions;
export default deoSlice.reducer;
