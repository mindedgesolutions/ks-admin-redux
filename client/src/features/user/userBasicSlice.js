import { createSlice } from "@reduxjs/toolkit";
import {
  addAccessToLocalStorage,
  getAccessFromLocalStorage,
} from "../../utils/data";

const initialState = {
  user: {},
  userAccess: {},
};

const userBasicSlice = createSlice({
  name: "userBasic",
  initialState: initialState,
  reducers: {
    currentAccess: (state) => {
      state.userAccess = getAccessFromLocalStorage();
    },
    details: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    access: (state, action) => {
      state.userAccess = { ...state.userAccess, [action.payload]: true };
      addAccessToLocalStorage(state.userAccess);
    },
    accessRevoke: (state, action) => {
      state.userAccess = { ...state.userAccess, [action.payload]: false };
      addAccessToLocalStorage(state.userAccess);
    },
    resetUserState: (state) => initialState,
  },
});

export const { currentAccess, details, access, accessRevoke, resetUserState } =
  userBasicSlice.actions;
export default userBasicSlice.reducer;
