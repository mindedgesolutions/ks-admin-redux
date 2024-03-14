import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  districts: [],
};

const districtSlice = createSlice({
  name: "districts",
  initialState: initialState,
  reducers: {
    setDistricts: (state, action) => {
      state.districts = action.payload;
      state.districts = [
        ...state.districts,
        {
          district_code: import.meta.env.VITE_ALL_DISTRICTS,
          district_name: "All",
        },
      ];
    },
    unsetDistricts: () => initialState,
  },
});

export const { setDistricts, unsetDistricts } = districtSlice.actions;
export default districtSlice.reducer;
