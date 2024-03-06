import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

const initialState = {
  gpWards: [],
  isLoading: false,
};

export const getGpWards = createAsyncThunk("masters/gpwards", async (data) => {
  try {
    const response = await customFetch.get(`/master/wards/${data}`);
    return response.data.data.rows;
  } catch (error) {
    console.log(error);
  }
});

const gpSlice = createSlice({
  name: "gpward",
  initialState: initialState,
  reducers: {
    resetGp: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGpWards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGpWards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gpWards = action.payload;
      })
      .addCase(getGpWards.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { resetGp } = gpSlice.actions;
export default gpSlice.reducer;
