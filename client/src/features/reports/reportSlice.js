import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
};

const reportSlice = createSlice({
  name: "reports",
  initialState: initialState,
  reducers: {
    setReport: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    },
  },
});

export const { setReport } = reportSlice.actions;
export default reportSlice.reducer;
