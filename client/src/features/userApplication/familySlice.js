import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  visibleF: false,
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
  allFSchemes: [],
  fMembers: [],
  fSchemes: [],
  clearData: 0,
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
    showFamilyModal: (state) => {
      state.visibleF = true;
    },
    hideFamilyModal: (state) => {
      state.visibleF = false;
      state.fMember = {
        id: 0,
        application_id: 0,
        member_name: "",
        member_gender: "",
        member_age: 0,
        member_aadhar_no: "",
        member_relationship: "",
        member_epic: "",
        member_schemes: [],
      };
    },
    clearSchemes: (state) => {
      state.clearData = state.clearData + 1;
      state.fMember = {
        id: 0,
        application_id: 0,
        member_name: "",
        member_gender: "",
        member_age: 0,
        member_aadhar_no: "",
        member_relationship: "",
        member_epic: "",
        member_schemes: [],
      };
    },
    familySchemeSet: (state, action) => {
      const sendSchemes = JSON.stringify(action.payload);
      state.fSchemes = sendSchemes;
    },
    currentMembers: (state, action) => {
      state.fMembers = action.payload.data.rows;
      state.allFSchemes = action.payload.meta.rows;
    },
    addMember: (state, action) => {
      state.fMembers = [...state.fMembers, action.payload.member];
      state.allFSchemes = action.payload.schemes;
    },
    memberInfo: (state, action) => {
      state.fMember = {
        id: Number(action.payload.id),
        application_id: Number(action.payload.application_id),
        member_name: action.payload.member_name,
        member_gender: action.payload.member_gender,
        member_age: Number(action.payload.member_age),
        member_aadhar_no: action.payload.member_aadhar_no,
        member_relationship: action.payload.member_relationship,
        member_epic: action.payload.member_epic,
        member_schemes: action.payload.schemes_array,
      };
    },
    editMember: (state, action) => {
      const { id } = action.payload.member;
      state.fMembers = state.fMembers.filter(
        (i) => Number(i.id) !== Number(id)
      );
      state.fMembers = [...state.fMembers, action.payload.member];
      state.allFSchemes = action.payload.schemes;
    },
    deleteMember: (state, action) => {
      const deleteId = action.payload;
      state.fMembers = state.fMembers.filter(
        (value) => Number(deleteId) !== Number(value.id)
      );
    },
    resetFamily: (state) => initialState,
  },
});

export const {
  showModal,
  hideModal,
  showFamilyModal,
  hideFamilyModal,
  familySchemeSet,
  clearSchemes,
  currentMembers,
  addMember,
  editMember,
  deleteMember,
  memberInfo,
  resetFamily,
} = familySlice.actions;
export default familySlice.reducer;
