import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

export const getEditDetails = createAsyncThunk(
  "/family/details",
  async (data) => {
    const response = await customFetch.get(
      `/applications/user/single-member/${data}`
    );
    console.log(response.data.data.rows[0]);
  }
);

const initialState = {
  visible: false,
  fMember: {
    id: 0,
    application_id: 0,
    member_name: "",
    member_gender: "",
    member_age: 0,
    member_aadhar_no: "",
    member_relationship: "",
    member_epic: "",
    member_schemes: [],
  },
  fMembers: [],
  fSchemes: [],
  isLoading: false,
};

const familySlice = createSlice({
  name: "family",
  initialState: initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.fMember.id = action.payload.id;
      state.fMember.member_name = action.payload.name;
    },
    hideModal: (state) => {
      state.visible = false;
      state.fMember = { id: 0, member_name: "" };
    },
    familySchemeSet: (state, action) => {
      const sendSchemes = JSON.stringify(action.payload);
      state.fSchemes = sendSchemes;
    },
    currentMembers: (state, action) => {
      state.fMembers = action.payload;
    },
    addMember: (state, action) => {
      state.fMembers = [...state.fMembers, action.payload];
    },
    editMember: (state, action) => {
      console.log(action.payload);
    },
    deleteMember: (state, action) => {
      const deleteId = action.payload;
      state.fMembers = state.fMembers.filter((value) => deleteId !== value.id);
    },
  },
});

export const {
  showModal,
  hideModal,
  familySchemeSet,
  currentMembers,
  addMember,
  editMember,
  deleteMember,
} = familySlice.actions;
export default familySlice.reducer;
