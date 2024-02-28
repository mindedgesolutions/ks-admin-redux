import React from "react";
import {
  ApplicationMenu,
  InputTextarea,
  UserPageHeader,
  UserPageWrapper,
  UserWorksite,
} from "../../../../components";
import { Form } from "react-router-dom";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { useDispatch, useSelector } from "react-redux";

// Loader starts ------
export const loader = async () => {
  try {
    const states = await customFetch.get("/master/states");
    const countries = await customFetch.get("/master/countries");
    const info = await customFetch.get("/applications/user/worksite-info");

    return { states, countries, info };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const WorkInfo = () => {
  document.title = `Worksite Information | ${import.meta.env.VITE_USER_TITLE}`;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  console.log(user);

  return (
    <>
      <UserPageHeader title="Personal Information" />
      <UserPageWrapper>
        <Form method="post" autoComplete="off">
          <input type="text" name="appId" value={user.id} />

          <div className="card pe-0">
            <div className="row g-0">
              <ApplicationMenu />

              <div className="col d-flex flex-column">
                <div className="row">
                  <div className="card-body">
                    <div className="row row-cards">
                      <div className="col-md-12 col-sm-12">
                        <InputTextarea
                          label="Worksite address"
                          name="workAddress"
                          required={true}
                          // value={form.workAddress}
                          // handleChange={handleChange}
                          autoFocus={true}
                        />
                      </div>
                      <UserWorksite />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </UserPageWrapper>
    </>
  );
};

export default WorkInfo;
