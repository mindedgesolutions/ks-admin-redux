import { createSlice } from "@reduxjs/toolkit";
import {
  addAccessToLocalStorage,
  getAccessFromLocalStorage,
} from "../../utils/data";

const accessSlice = createSlice({
  name: "userAccess",
  initialState: {
    availableAccess: getAccessFromLocalStorage() || null,
    loading: false,
    error: null,
  },
  reducers: {
    updateAccess: (state, action) => {
      state.availableAccess = action.payload;
      addAccessToLocalStorage(action.payload);
    },
  },
});

export const { updateAccess } = accessSlice.actions;
export default accessSlice.reducer;
