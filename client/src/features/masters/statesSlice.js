import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: [],
  isLoading: false,
};

const statesSlice = createSlice({
  name: "states",
  initialState: initialState,
  reducers: {
    setStateList: (state, action) => {
      state.states = action.payload;
    },
  },
});

export const { setStateList } = statesSlice.actions;
export default statesSlice.reducer;
