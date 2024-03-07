import React, { useEffect, useState } from "react";
import InputText from "../../InputText";
import InputRadio from "../../InputRadio";
import InputSelect from "../../InputSelect";
import UserFamilySchemes from "./UserFamilySchemes";
import SubmitBtn from "../../SubmitBtn";
import { genders, relationships } from "../../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  addMember,
  clearSchemes,
  editMember,
} from "../../../features/userApplication/familySlice";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { splitErrors } from "../../../utils/showErrors";
import { access } from "../../../features/user/userBasicSlice";

const FamilyAddForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { fMember, fSchemes, allFSchemes } = useSelector(
    (store) => store.family
  );

  const relationshipsList = relationships.filter(
    (relation) => relation.isActive === true
  );

  // Form input state management starts ------
  const [form, setForm] = useState({
    memberName: "",
    memberGender: "",
    memberAge: "",
    memberRelation: "",
    memberAadhaar: "",
    memberEpic: "",
    btnLabel: "Add member",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Form input state management ends ------

  // Reset family form starts ------
  const resetForm = () => {
    setForm({
      ...form,
      memberName: "",
      memberGender: "",
      memberAge: "",
      memberRelation: "",
      memberAadhaar: "",
      memberEpic: "",
      btnLabel: "Add member",
    });
    dispatch(clearSchemes());
  };
  // Reset family form ends ------

  // Handle form submit (add / edit) starts ------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let inputValues = Object.fromEntries(formData);
    inputValues = { ...inputValues, memberSchemes: fSchemes };
    const process =
      inputValues.editId > 0 ? customFetch.patch : customFetch.post;
    const url =
      inputValues.editId > 0
        ? `/applications/user/update-member/${inputValues.appId}/${inputValues.editId}`
        : `/applications/user/add-member`;
    const msg = inputValues.editId > 0 ? `Information updated` : `Member added`;

    try {
      const response = await process(url, inputValues);
      // Construct member object starts ------
      const newMember = {
        id:
          inputValues.editId > 0
            ? inputValues.editId
            : response.data.data.rows[0].id,
        application_id: Number(inputValues.appId),
        member_name: inputValues.memberName,
        member_gender: inputValues.memberGender,
        member_age: Number(inputValues.memberAge),
        member_aadhar_no: inputValues.memberAadhaar,
        member_relationship: inputValues.memberRelation,
        member_epic: inputValues.memberEpic,
        member_schemes: fSchemes,
      };
      // Construct member object ends ------

      // Construct all schemes object starts ------
      let filtered;
      if (inputValues.editId) {
        filtered = allFSchemes.filter(
          (i) => Number(i.member_id) !== Number(inputValues.editId)
        );
      } else {
        filtered = allFSchemes;
      }
      const newArray = [];
      JSON.parse(fSchemes).map((f) => {
        const newSObj = {
          member_id:
            inputValues.editId > 0
              ? inputValues.editId
              : response.data.data.rows[0].id,
          scheme_id: String(f.value),
          schemes_name: f.label,
        };
        newArray.push(newSObj);
      });
      const updatedArray = [...filtered, ...newArray];
      // Construct all schemes object ends ------

      inputValues.editId > 0
        ? dispatch(editMember({ member: newMember, schemes: updatedArray }))
        : dispatch(addMember({ member: newMember, schemes: updatedArray }));

      dispatch(access("doc"));

      toast.success(msg);
      setIsLoading(false);
      resetForm();
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };
  // Handle form submit (add / edit) ends ------

  // Get member details starts ------
  useEffect(() => {
    setForm({
      ...form,
      memberName: fMember.id ? fMember.member_name : "",
      memberGender: fMember.id ? fMember.member_gender : "",
      memberAge: fMember.id ? fMember.member_age : "",
      memberRelation: fMember.id ? fMember.member_relationship : "",
      memberAadhaar: fMember.id ? fMember.member_aadhar_no : "",
      memberEpic: fMember.id ? fMember.member_epic : "",
      btnLabel: fMember.id ? "Save changes" : "Add member",
    });
  }, [fMember]);
  // Get member details ends ------

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <input type="hidden" name="appId" value={user.id} />
      <input type="hidden" name="editId" value={fMember.id} />

      <div className="card-body">
        <div className="row row-cards">
          <div className="col-md-6 col-sm-12">
            <InputText
              label="Family member name"
              name="memberName"
              required={true}
              value={form.memberName}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <InputRadio
              label="Gender"
              name="memberGender"
              required={true}
              options={genders}
              value={form.memberGender}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <InputText
              label="Age"
              name="memberAge"
              required={true}
              value={form.memberAge}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <InputSelect
              label="Relationship"
              name="memberRelation"
              placeholder="relationship"
              options={relationshipsList}
              required={true}
              value={form.memberRelation}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <InputText
              label="Aadhaar no."
              name="memberAadhaar"
              required={true}
              value={form.memberAadhaar}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <InputText
              label="EPIC no."
              name="memberEpic"
              required={Number(form.memberAge) >= 18}
              value={form.memberEpic}
              handleChange={handleChange}
            />
          </div>
          <UserFamilySchemes />
        </div>
        <div className="mt-5">
          <SubmitBtn text={form.btnLabel} isLoading={isLoading} />
          <button
            type="button"
            className="btn btn-default ms-2"
            onClick={resetForm}
          >
            Reset form
          </button>
        </div>
      </div>
    </form>
  );
};

export default FamilyAddForm;
