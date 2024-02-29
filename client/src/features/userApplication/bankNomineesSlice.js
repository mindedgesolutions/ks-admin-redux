import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const bankNomineeSlice = createSlice({
  name: "bankNominee",
  initialState: initialState,
  reducers: {},
});

export default bankNomineeSlice.reducer;
