import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

const initialState = {
  psList: [],
  isLoading: false,
};

export const getPsList = createAsyncThunk("master/ps", async (data) => {
  try {
    const response = await customFetch.get(`/master/ps/${data}`);
    return response.data.data.rows;
  } catch (error) {
    console.log(error);
  }
});

const psSlice = createSlice({
  name: "policestation",
  initialState: initialState,
  reducers: {
    resetPs: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPsList.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getPsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.psList = action.payload;
      })
      .addCase(getPsList.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { resetPs } = psSlice.actions;
export default psSlice.reducer;
