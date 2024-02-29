import React from "react";
import {
  ApplicationMenu,
  UserBank,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { useSelector } from "react-redux";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const banks = await customFetch.get("/master/banks");
    const schemes = await customFetch.get("/master/schemes");
    const info = await customFetch.get("/applications/user/bank-nominee");
    const userSchemes = await customFetch.get(
      "/applications/user/selected-schemes"
    );
    return { banks, schemes, info, userSchemes };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const BankNominee = () => {
  const { info } = useLoaderData();
  const { user } = useSelector((store) => store.user);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <UserPageHeader title="Bank & Nominee Information" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <input type="hidden" name="appId" value={user.id} />

                <div className="card-body">
                  <div className="row row-cards">
                    <UserBank />
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

export default BankNominee;
