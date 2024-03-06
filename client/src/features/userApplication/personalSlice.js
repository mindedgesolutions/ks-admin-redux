import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  epicRequired: false,
  religionOther: false,
  userAge: 0,
};

const getAge = (date) => {
  const newDob = dayjs(date);
  const today = dayjs(dayjs().format("YYYY-MM-DD"));
  const age = today.diff(newDob, "y");
  return age;
};

const personalSlice = createSlice({
  name: "personal",
  initialState: initialState,
  reducers: {
    changeAge: (state, action) => {
      const age = getAge(action.payload);
      state.userAge = age;
      state.epicRequired = age > 18 ? true : false;
    },
    currentEpic: (state, action) => {
      const age = getAge(action.payload);
      state.epicRequired = age > 18 ? true : false;
    },
    currentReligion: (state, action) => {
      state.religionOther = action.payload === "9" ? true : false;
    },
    changeReligion: (state, action) => {
      state.religionOther = action.payload === "9" ? true : false;
    },
    resetPersonal: (state) => initialState,
  },
});

export const {
  changeAge,
  currentEpic,
  currentReligion,
  changeReligion,
  resetPersonal,
} = personalSlice.actions;
export default personalSlice.reducer;
