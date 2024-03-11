import React, { useState } from "react";
import {
  ApplicationMenu,
  InputSelect,
  InputText,
  InputTextarea,
  SubmitBtn,
  UserAppLoader,
  UserPageHeader,
  UserPageWrapper,
  UserWorksite,
} from "../../../../components";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { nanoid } from "nanoid";
import { access } from "../../../../features/user/userBasicSlice";
import { toast } from "react-toastify";
import { datePickerFormat } from "../../../../utils/functions";
import { setStateList } from "../../../../features/masters/statesSlice";
import { setCountryList } from "../../../../features/masters/countrySlice";
import { setJobList } from "../../../../features/masters/jobsSlice";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    // const { states: stateList } = store.getState().states;

    // if (stateList.length === 0) {
    //   const states = await customFetch.get("/master/states");
    // }

    const states = await customFetch.get("/master/states");
    const jobs = await customFetch.get("/master/jobs");
    const countries = await customFetch.get("/master/countries");
    const info = await customFetch.get("/applications/user/worksite-info");

    store.dispatch(setStateList(states.data.data.rows));
    store.dispatch(setJobList(jobs.data.data.rows));
    store.dispatch(setCountryList(countries.data.data.rows));

    return { info };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const WorkInfo = () => {
  document.title = `Worksite Information | ${import.meta.env.VITE_USER_TITLE}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { info } = useLoaderData();
  const { jobs } = useSelector((store) => store.jobs);

  const [form, setForm] = useState({
    workAddress: info?.data?.data?.rows[0]?.present_address || "",
    workPs: info?.data?.data?.rows[0]?.present_ps || "",
    empNature: info?.data?.data?.rows[0]?.nature_of_work_id || "",
    migDate: info?.data?.data?.rows[0]?.migrated_from_date
      ? datePickerFormat(info?.data?.data?.rows[0]?.migrated_from_date)
      : "",
    expectedWages: info?.data?.data?.rows[0]?.expected_salary || "",
    isLoading: false,
  });
  const { user } = useSelector((store) => store.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, isLoading: true });
    const formData = new FormData(e.currentTarget);
    const inputValues = Object.fromEntries(formData);
    try {
      const process =
        info.data.data.rowCount > 0 ? customFetch.patch : customFetch.post;
      const msg =
        info.data.data.rowCount > 0
          ? `Information updated`
          : `Information added`;

      await process(`/applications/user/worksite-info`, inputValues);
      dispatch(access("agency"));

      setForm({ ...form, isLoading: false });
      toast.success(msg);
      navigate("/user/agency-info");
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
                        <div className="col-md-12 col-sm-12">
                          <InputTextarea
                            label="Worksite address"
                            name="workAddress"
                            required={true}
                            value={form.workAddress}
                            handleChange={handleChange}
                            autoFocus={true}
                          />
                        </div>
                      </div>
                      <UserWorksite />
                      <div className="row row-cards mt-1">
                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="Worksite police station"
                            name="workPs"
                            required={true}
                            value={form.workPs}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <label
                            htmlFor="empNature"
                            className="form-label required"
                          >
                            Nature of employment
                          </label>
                          <select
                            name="empNature"
                            id="empNature"
                            className="form-select"
                            value={form.empNature}
                            onChange={handleChange}
                          >
                            <option value="">
                              - Select nature of employment -
                            </option>
                            {jobs.map((option) => {
                              return (
                                <option key={nanoid()} value={option.id}>
                                  {option.nature_of_work}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <label
                            htmlFor="migDate"
                            className="form-label required"
                          >
                            Migrated on
                          </label>
                          <input
                            type="date"
                            name="migDate"
                            id="migDate"
                            value={form.migDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <InputText
                            label="Expected wages per day"
                            name="expectedWages"
                            required={false}
                            value={form.expectedWages}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className="mt-5">
                          <SubmitBtn isLoading={form.isLoading} />
                        </div>
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

export default WorkInfo;
