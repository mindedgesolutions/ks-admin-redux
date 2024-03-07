import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banks: [],
  isLoading: false,
};

const bankSlice = createSlice({
  name: "banks",
  initialState: initialState,
  reducers: {
    setBankList: (state, action) => {
      state.banks = action.payload;
    },
  },
});

export const { setBankList } = bankSlice.actions;
export default bankSlice.reducer;
