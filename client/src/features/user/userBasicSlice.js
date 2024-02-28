import { createSlice } from "@reduxjs/toolkit";
import {
  addAccessToLocalStorage,
  getAccessFromLocalStorage,
} from "../../utils/data";

const defaultState = {
  user: {},
  userAccess: getAccessFromLocalStorage(),
};

const userBasicSlice = createSlice({
  name: "userBasic",
  initialState: defaultState,
  reducers: {
    details: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    access: (state, action) => {
      state.userAccess = { ...state.userAccess, [action.payload]: true };
      addAccessToLocalStorage(state.userAccess);
    },
  },
});

export const { details, access } = userBasicSlice.actions;
export default userBasicSlice.reducer;
