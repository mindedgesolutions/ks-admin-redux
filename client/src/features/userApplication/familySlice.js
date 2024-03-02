import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  memberId: "",
  name: "",
  gender: "",
  age: "",
  relation: "",
  aadhaar: "",
  epic: "",
  isLoading: false,
};

const familySlice = createSlice({
  name: "family",
  initialState: initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.memberId = action.payload.id;
      state.name = action.payload.name;
    },
    hideModal: (state) => {
      state.visible = false;
      state.memberId = "";
      state.name = "";
    },
    editMember: (state, action) => {
      console.log(action.payload);
      state.memberId = "";
      state.name = "";
      state.gender = "";
      state.age = "";
      state.relation = "";
      state.aadhaar = "";
      state.epic = "";
    },
  },
});

export const { showModal, hideModal, editMember } = familySlice.actions;
export default familySlice.reducer;
