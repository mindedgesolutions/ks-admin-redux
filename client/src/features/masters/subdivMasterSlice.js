import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

export const getSubdivs = createAsyncThunk("master/subdivs", async (data) => {
  if (data) {
    try {
      const response = await customFetch.get(`/master/sub-divisions/${data}`);
      return response.data.data.rows;
    } catch (error) {
      console.log(error);
    }
  } else {
    return null;
  }
});

const initialState = {
  subDivisions: [],
  inputSubdiv: "",
  isLoading: false,
};

const subDivSlice = createSlice({
  name: "subdivs",
  initialState: initialState,
  reducers: {
    changeSubdiv: (state, action) => {
      state.inputSubdiv = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubdivs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubdivs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subDivisions = action.payload;
      })
      .addCase(getSubdivs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { changeSubdiv } = subDivSlice.actions;
export default subDivSlice.reducer;
