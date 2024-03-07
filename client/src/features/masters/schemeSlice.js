import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schemes: [],
  isLoading: false,
};

const schemeSlice = createSlice({
  name: "schemes",
  initialState: initialState,
  reducers: {
    setSchemeList: (state, action) => {
      state.schemes = action.payload;
    },
  },
});

export const { setSchemeList } = schemeSlice.actions;
export default schemeSlice.reducer;
