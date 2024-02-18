import React, { useEffect, useState } from "react";
import {
  ApplicationMenu,
  LocationRelated,
  ReligionRelated,
  SubmitBtn,
  UserInputRadio,
  UserInputSelect,
  UserInputText,
  UserInputTextarea,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import {
  genders,
  casteList,
  qualificationList,
  getAccessFromLocalStorage,
} from "../../../../utils/data";
import Qualification from "../../../../components/user/portal/application/Qualification";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { useLoaderData, useNavigate } from "react-router-dom";
import { datePickerFormat } from "../../../../utils/functions";
import { useUserContext } from "../UserLayout";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateAccess } from "../../../../features/access/accessSlice";

export const loader = async () => {
  try {
    const info = await customFetch.get("/applications/user/personal-info");
    const districts = await customFetch.get("/master/districts");
    return { info, districts };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const PersonalInfo = () => {
  document.title = `Personal Information | ${import.meta.env.VITE_USER_TITLE}`;
  const { appUser, setAppUser, setAppId } = useUserContext();
  const [isIdle, setIsIdle] = useState(false);
  const { info, districts } = useLoaderData();
  const navigate = useNavigate();
  const [userAccess, setUserAccess] = useState(getAccessFromLocalStorage());

  // Structuring data from db starts ------
  const [form, setForm] = useState({
    name: info.data.data?.rows[0]?.name || "",
    fatherHusbandName: info.data.data?.rows[0]?.father_husband_name || "",
    gender: info.data.data?.rows[0]?.gender || "",
    category: info.data.data?.rows[0]?.caste || "",
    aadhaar: info.data.data?.rows[0]?.aadhar_no || "",
    permanentAddress: info.data.data?.rows[0]?.permanent_address || "",
    pin: info.data.data?.rows[0]?.permanent_pin || "",
    qualification: info.data.data?.rows[0]?.qualification || "",
    epic: info.data.data?.rows[0]?.epic_no || "",
  });

  const dbReligion = info.data.data?.rows[0]?.religion || "";
  const dbReligionOther = info.data.data?.rows[0]?.religion_other || "";
  const dbEmergencyContact =
    info.data.data?.rows[0]?.emergency_contact_no || "";
  const dbDist = info.data.data?.rows[0]?.permanent_dist || "";
  const dbSubDiv = info.data.data?.rows[0]?.permanent_subdivision || "";
  const dbAreaType = info.data.data?.rows[0]?.permanent_areatype.trim() || "";
  const dbAreaCode = info.data.data?.rows[0]?.permanent_areacode || "";
  const dbVillWard = info.data.data?.rows[0]?.permanent_villward || "";
  const dbPs = info.data.data?.rows[0]?.permanent_ps || "";
  const dbTechSkill = info.data.data?.rows[0]?.technical_skill || "";
  // Structuring data from db ends ------

  // D.O.B / EPIC starts ------
  const [dbDob, setDbDob] = useState(
    info.data.data?.rows[0]?.dob
      ? datePickerFormat(info.data.data?.rows[0]?.dob)
      : ""
  );
  const [epicRequired, setEpicRequired] = useState(false);
  const [userAge, setUserAge] = useState(info.data.data?.rows[0]?.age || 0);

  const handleDobChange = (e) => {
    const newDob = e.target.value;
    const today = dayjs(dayjs().format("YYYY-MM-DD"));
    const dob = dayjs(newDob);
    const age = today.diff(dob, "y");
    if (age > 18) {
      setEpicRequired(true);
    } else {
      setEpicRequired(false);
    }
    setDbDob(newDob);
    setUserAge(age);
  };
  // D.O.B / EPIC ends ------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    setIsIdle(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const process =
      info.data.data.rowCount > 0 ? customFetch.patch : customFetch.post;
    const msg = info.data.data.rowCount > 0 ? `Data updated` : `Data added`;
    try {
      const response = await process(`/applications/user/personal-info`, data);
      toast.success(msg);

      setAppUser({ ...appUser, name: form.name });
      setAppId(response.data.data);
      setIsIdle(false);

      const newSet = { ...userAccess, worksite: true };
      setUserAccess(newSet);
      dispatch(updateAccess(newSet));

      navigate("/user/worksite-info");
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      setIsIdle(false);
      return error;
    }
  };

  return (
    <>
      <UserPageHeader title="Personal Information" />
      <UserPageWrapper>
        <div className="card pe-0">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <div className="row">
                <form onSubmit={handleFormSubmit} autoComplete="off">
                  <input type="hidden" name="age" value={userAge} />

                  <div className="card-body">
                    <div className="row row-cards">
                      <div className="col-md-6 col-sm-12">
                        <UserInputText
                          label="Name"
                          name="name"
                          required={true}
                          value={form.name}
                          handleChange={handleChange}
                          autoFocus={true}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <UserInputText
                          label="Father's / Husband's name"
                          name="fatherHusbandName"
                          required={true}
                          value={form.fatherHusbandName}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <UserInputRadio
                          label="Gender"
                          name="gender"
                          required={true}
                          options={genders}
                          value={form.gender}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label htmlFor="dob" className="form-label required">
                          Date of birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          value={dbDob}
                          onChange={handleDobChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <UserInputSelect
                          label="Category"
                          name="category"
                          required={true}
                          options={casteList}
                          value={form.category}
                          handleChange={handleChange}
                        />
                      </div>

                      <ReligionRelated
                        religion={dbReligion}
                        religionOther={dbReligionOther}
                        emergencyMobile={dbEmergencyContact}
                      />
                    </div>

                    <div className="row row-cards mt-1">
                      <div className="col-md-6 col-sm-12">
                        <UserInputText
                          label="Aadhaar number"
                          name="aadhaar"
                          required={true}
                          value={form.aadhaar}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <UserInputText
                          label="EPIC number"
                          name="epic"
                          required={epicRequired}
                          value={form.epic}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <UserInputTextarea
                          label="Permanent address"
                          name="permanentAddress"
                          required={true}
                          value={form.permanentAddress}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row row-cards mt-1">
                      <LocationRelated
                        districts={districts}
                        dbDist={dbDist}
                        dbSubDiv={dbSubDiv}
                        dbBlType={dbAreaType}
                        dbBlCode={dbAreaCode}
                        dbGp={dbVillWard}
                        dbPs={dbPs}
                      />

                      <div className="col-md-6 col-sm-12">
                        <UserInputText
                          label="PIN code"
                          name="pin"
                          required={true}
                          value={form.pin}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <UserInputSelect
                          label="Qualification"
                          name="qualification"
                          required={true}
                          options={qualificationList}
                          value={form.qualification}
                          handleChange={handleChange}
                        />
                      </div>

                      <Qualification skillDesc={dbTechSkill} />
                    </div>
                    <div className="mt-5">
                      <SubmitBtn isIdle={isIdle} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default PersonalInfo;
