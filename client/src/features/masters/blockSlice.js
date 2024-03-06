import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

const initialState = {
  blLabel: "Block",
  blocks: [],
  isLoading: false,
};

export const getBlocks = createAsyncThunk("masters/block", async (data) => {
  try {
    if (data.bltype) {
      const response = await customFetch.get(
        `/master/blocks/${data.sdcode}/${data.bltype}`
      );
      return response.data.data.rows;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
});

const blockSlice = createSlice({
  name: "blocks",
  initialState: initialState,
  reducers: {
    changeBlLabel: (state, action) => {
      switch (action.payload.bltype) {
        case "M":
          state.blLabel = "Municipality";
          break;
        case "C":
          state.blLabel = "Corporation";
          break;
        case "B":
          state.blLabel = "Block";
          break;
      }
    },
    resetBlock: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlocks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blocks = action.payload;
      })
      .addCase(getBlocks.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { changeBlLabel, resetBlock } = blockSlice.actions;
export default blockSlice.reducer;
