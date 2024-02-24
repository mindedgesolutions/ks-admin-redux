import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

const initialState = {
  districts: [],
};

export const districts = createAsyncThunk("master/districts", async () => {
  try {
    const response = await customFetch.get("/master/districts");
    console.log(response.data.data);
    return response;
  } catch (error) {
    console.log(error);
  }
});

const districtSlice = createSlice({
  name: "districts",
  initialState: initialState,
  reducers: {},
});

export default districtSlice.reducer;
