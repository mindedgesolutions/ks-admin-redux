import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const getDistricts = createAsyncThunk("master/districts", async () => {
  try {
    const response = await customFetch.get("/master/districts");
    return response.data.data.rows;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  districts: [],
  inputDist: "",
  isLoading: false,
};

const districtSlice = createSlice({
  name: "districts",
  initialState: initialState,
  reducers: {
    changeDist: (state, action) => {
      state.inputDist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDistricts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.districts = action.payload;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { changeDist } = districtSlice.actions;
export default districtSlice.reducer;
