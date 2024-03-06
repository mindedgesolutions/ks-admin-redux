import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: "personal",
};

const overViewSlice = createSlice({
  name: "overview",
  initialState: initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = overViewSlice.actions;
export default overViewSlice.reducer;
