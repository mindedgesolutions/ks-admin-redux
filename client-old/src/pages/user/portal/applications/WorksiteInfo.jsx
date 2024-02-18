import React, { useState } from "react";
import {
  SubmitBtn,
  UserInputDate,
  UserInputSelect,
  UserInputText,
  UserInputTextarea,
  UserPageHeader,
  UserPageWrapper,
  WorksiteCountry,
} from "../../../../components";
import ApplicationMenu from "../../../../components/user/portal/application/ApplicationMenu";
import { getAccessFromLocalStorage, jobs } from "../../../../utils/data";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { useLoaderData, useNavigate } from "react-router-dom";
import { datePickerFormat } from "../../../../utils/functions";
import { useUserContext } from "../UserLayout";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateAccess } from "../../../../features/access/accessSlice";

export const loader = async () => {
  try {
    const states = await customFetch.get("/master/states");
    const { data } = await customFetch.get("/applications/user/worksite-info");
    return { data, states };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const WorksiteInfo = () => {
  const { data, states } = useLoaderData();
  const { appId } = useUserContext();
  document.title = `Worksite Information | ${import.meta.env.VITE_USER_TITLE}`;
  const [isIdle, setIsIdle] = useState(false);
  const navigate = useNavigate();
  const [userAccess, setUserAccess] = useState(getAccessFromLocalStorage());
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    workAddress: data?.data?.rows[0]?.present_address || "",
    workPs: data?.data?.rows[0]?.present_ps || "",
    empNature: data?.data?.rows[0]?.nature_of_work_id || "",
    migDate: data?.data?.rows[0]?.migrated_from_date
      ? datePickerFormat(data?.data?.rows[0]?.migrated_from_date)
      : "",
    expectedWages: data?.data?.rows[0]?.expected_salary || "",
  });
  const dbCountry = data?.data?.rows[0]?.present_country || "";
  const dbCountryName = data?.data?.rows[0]?.present_country_name || "";
  const dbPassport = data?.data?.rows[0]?.passport_no || "";
  const dbState = data?.data?.rows[0]?.present_state || "";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    setIsIdle(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputValues = Object.fromEntries(formData);
    const process =
      data.data.rowCount > 0 ? customFetch.patch : customFetch.post;
    const msg = data.data.rowCount > 0 ? `Data updated` : `Data added`;
    try {
      await process("/applications/user/worksite-info", inputValues);
      toast.success(msg);
      setIsIdle(false);

      const newSet = { ...userAccess, agency: true };
      setUserAccess(newSet);
      dispatch(updateAccess(newSet));

      navigate("/user/agency-info");
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      setIsIdle(false);
      return error;
    }
  };

  return (
    <>
      <UserPageHeader title="Worksite Information" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <input type="hidden" name="appId" defaultValue={appId} />

                <div className="card-body">
                  <div className="row row-cards">
                    <div className="col-md-12 col-sm-12">
                      <UserInputTextarea
                        label="Worksite address"
                        name="workAddress"
                        required={true}
                        value={form.workAddress}
                        handleChange={handleChange}
                        autoFocus={true}
                      />
                    </div>
                  </div>
                  <div className="row row-cards">
                    <WorksiteCountry
                      country={dbCountry}
                      countryName={dbCountryName}
                      passportNo={dbPassport}
                      stateCode={dbState}
                      dbStateList={states}
                    />
                  </div>
                  <div className="row row-cards mt-1">
                    <div className="col-md-6 col-sm-12">
                      <UserInputText
                        label="Worksite police station"
                        name="workPs"
                        required={true}
                        value={form.workPs}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <UserInputSelect
                        label="Nature of employment"
                        name="empNature"
                        required={true}
                        options={jobs}
                        value={form.empNature}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <UserInputDate
                        label="Migrated on"
                        name="migDate"
                        required={true}
                        value={form.migDate}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <UserInputText
                        label="Expected wages per day"
                        name="expectedWages"
                        required={false}
                        value={form.expectedWages}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="mt-5">
                      <SubmitBtn isIdle={isIdle} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default WorksiteInfo;
