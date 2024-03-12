import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { splitErrors } from "../../../../utils/showErrors";
import customFetch from "../../../../utils/customFetch";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import {
  ApplicationMenu,
  UserPageHeader,
  UserPageWrapper,
  InputText,
  InputRadio,
  InputSelect,
  InputTextarea,
  UserLocation,
  UserTechSkills,
  SubmitBtn,
  UserAppLoader,
} from "../../../../components";
import {
  casteList,
  genders,
  qualificationList,
  religions,
} from "../../../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAge,
  changeReligion,
  currentEpic,
  currentReligion,
} from "../../../../features/userApplication/personalSlice";
import { datePickerFormat } from "../../../../utils/functions";
import { access, details } from "../../../../features/user/userBasicSlice";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    const info = await customFetch.get("/applications/user/personal-info");
    const districts = await customFetch.get("/master/districts");

    store.dispatch(currentReligion(info?.data?.data?.rows[0]?.religion));
    store.dispatch(currentEpic(info?.data?.data?.rows[0]?.dob));

    return { info, districts };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const PersonalInfo = () => {
  document.title = `Personal Information | ${import.meta.env.VITE_USER_TITLE}`;
  const dispatch = useDispatch();
  const { info } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { epicRequired, religionOther, userAge } = useSelector(
    (store) => store.personal
  );
  const { user } = useSelector((store) => store.user);

  const [form, setForm] = useState({
    name: info?.data?.data?.rows[0]?.name || "",
    fatherHusbandName: info?.data?.data?.rows[0]?.father_husband_name || "",
    gender: info?.data?.data?.rows[0]?.gender || "",
    dob: info?.data?.data?.rows[0]?.dob
      ? datePickerFormat(info?.data?.data?.rows[0]?.dob)
      : "",
    category: info?.data?.data?.rows[0]?.caste || "",
    religion: info?.data?.data?.rows[0]?.religion || "",
    religionOther: info?.data?.data?.rows[0]?.religion_other || "",
    emergencyMobile: info?.data?.data?.rows[0]?.emergency_contact_no || "",
    aadhaar: info?.data?.data?.rows[0]?.aadhar_no || "",
    epic: info?.data?.data?.rows[0]?.epic_no || "",
    permanentAddress: info?.data?.data?.rows[0]?.permanent_address || "",
    pin: info?.data?.data?.rows[0]?.permanent_pin || "",
    qualification: info?.data?.data?.rows[0]?.qualification || "",
    isLoading: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDobChange = (e) => {
    setForm({ ...form, dob: e.target.value });
    dispatch(changeAge(e.target.value));
  };

  const handleReligionChange = (e) => {
    setForm({ ...form, religion: e.target.value });
    dispatch(changeReligion(e.target.value));
  };

  useEffect(() => {
    form.dob && dispatch(changeAge(form.dob));
  }, []);

  // Handle form submit ------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, isLoading: true });
    const formData = new FormData(e.currentTarget);
    const inputValues = Object.fromEntries(formData);
    try {
      const process = inputValues.appId ? customFetch.patch : customFetch.post;
      const msg = inputValues.appId ? `Data updated` : `Data added`;

      const response = await process(
        `/applications/user/personal-info`,
        inputValues
      );
      dispatch(details({ id: response.data.data, name: inputValues.name }));
      dispatch(access("worksite"));

      setForm({ ...form, isLoading: false });
      toast.success(msg);
      navigate("/user/worksite-info");
    } catch (error) {
      setForm({ ...form, isLoading: false });
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <>
      <UserPageHeader title="Personal Information" />
      <UserPageWrapper>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <input type="hidden" name="age" value={userAge} />
          <input type="hidden" name="appId" value={user.id} />

          <div className="card pe-0">
            <div className="row g-0">
              <ApplicationMenu />

              <div className="col d-flex flex-column">
                <div className="row">
                  {navigation.state === "loading" ? (
                    <UserAppLoader />
                  ) : (
                    <div className="card-body">
                      <div className="row row-cards">
                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="Name"
                            name="name"
                            required={true}
                            value={form.name}
                            handleChange={handleChange}
                            autoFocus={true}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="Father's / Husband's name"
                            name="fatherHusbandName"
                            required={true}
                            value={form.fatherHusbandName}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputRadio
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
                            value={form.dob}
                            onChange={handleDobChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputSelect
                            label="Category"
                            name="category"
                            required={true}
                            options={casteList}
                            value={form.category}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputSelect
                            label="Religion"
                            name="religion"
                            required={true}
                            options={religions}
                            value={form.religion}
                            handleChange={handleReligionChange}
                          />
                        </div>
                        {religionOther && (
                          <div className="col-md-6 col-sm-12">
                            <InputText
                              label="Enter your religion"
                              name="religionOther"
                              required={true}
                              value={form.religionOther}
                              handleChange={handleChange}
                            />
                          </div>
                        )}
                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="Emergency mobile number of family member"
                            name="emergencyMobile"
                            required={true}
                            value={form.emergencyMobile}
                            handleChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row row-cards mt-0">
                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="Aadhaar number"
                            name="aadhaar"
                            required={true}
                            value={form.aadhaar}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="EPIC number"
                            name="epic"
                            required={epicRequired}
                            value={form.epic}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputTextarea
                            label="Permanent address"
                            name="permanentAddress"
                            required={true}
                            value={form.permanentAddress}
                            handleChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row row-cards mt-0">
                        <UserLocation />

                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="PIN code"
                            name="pin"
                            required={true}
                            value={form.pin}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputSelect
                            label="Qualification"
                            name="qualification"
                            required={true}
                            options={qualificationList}
                            value={form.qualification}
                            handleChange={handleChange}
                          />
                        </div>

                        <UserTechSkills />
                      </div>
                      <div className="mt-5">
                        <SubmitBtn isLoading={form.isLoading} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </UserPageWrapper>
    </>
  );
};

export default PersonalInfo;
