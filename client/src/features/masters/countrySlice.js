import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  isLoading: false,
};

const countrySlice = createSlice({
  name: "countries",
  initialState: initialState,
  reducers: {
    setCountryList: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountryList } = countrySlice.actions;
export default countrySlice.reducer;
