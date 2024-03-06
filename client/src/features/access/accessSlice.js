import { createSlice } from "@reduxjs/toolkit";
import {
  addAccessToLocalStorage,
  getAccessFromLocalStorage,
} from "../../utils/data";

const initialState = {
  availableAccess: getAccessFromLocalStorage() || null,
  loading: false,
  error: null,
};

const accessSlice = createSlice({
  name: "userAccess",
  initialState: initialState,
  reducers: {
    updateAccess: (state, action) => {
      state.availableAccess = action.payload;
      addAccessToLocalStorage(action.payload);
    },
    resetAccessState: (state) => initialState,
  },
});

export const { updateAccess, resetAccessState } = accessSlice.actions;
export default accessSlice.reducer;
