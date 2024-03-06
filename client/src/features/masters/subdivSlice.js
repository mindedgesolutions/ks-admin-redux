import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

const initialState = {
  subdivs: [],
  isLoading: false,
};

export const getSubdivs = createAsyncThunk(
  "masters/sub-division",
  async (value) => {
    try {
      const response = await customFetch.get(`/master/sub-divisions/${value}`);
      return response.data.data.rows;
    } catch (error) {
      console.log(error);
    }
  }
);

const subdivSlice = createSlice({
  name: "subdivs",
  initialState: initialState,
  reducers: {
    resetSubdiv: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubdivs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubdivs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subdivs = action.payload;
      })
      .addCase(getSubdivs.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { resetSubdiv } = subdivSlice.actions;
export default subdivSlice.reducer;
