import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captcha: null,
  isLoading: false,
};

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState: initialState,
  reducers: {
    generateCaptcha: (state) => {
      const min = 100000;
      const max = 999999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      state.captcha = randomNumber;
    },
  },
});

export const { generateCaptcha } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;
