import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  mwin: null,
  status: null,
  mobile: null,
  regDate: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: initialState,
  reducers: {
    userInfo: (state, action) => {
      state.name = action.payload.name;
      state.mwin = action.payload.mwin;
      state.status = action.payload.status;
      state.mobile = action.payload.mobile;
      state.regDate = action.payload.regDate;
    },
  },
});

export const { userInfo } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
