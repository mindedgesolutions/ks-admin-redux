import React, { useEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { UserTopNav, UserSideBar, UserFooter } from "../../../components";

import customFetch from "../../../utils/customFetch";
import {
  addAccessToLocalStorage,
  removeAccessFromLocalStorage,
} from "../../../utils/data";
import { splitErrors } from "../../../utils/showErrors";
import { toast } from "react-toastify";
import {
  changeMobile,
  resetOtpState,
} from "../../../features/otplogin/otpLoginSlice";
import {
  currentAccess,
  details,
  resetUserState,
} from "../../../features/user/userBasicSlice";
import { useDispatch } from "react-redux";
import { resetAccessState } from "../../../features/access/accessSlice.js";
import { resetFamily } from "../../../features/userApplication/familySlice.js";
import { resetBlock } from "../../../features/masters/blockSlice.js";
import { resetGp } from "../../../features/masters/gpSlice.js";
import { resetPs } from "../../../features/masters/psSlice.js";
import { resetSubdiv } from "../../../features/masters/subdivSlice.js";
import { resetBankNominee } from "../../../features/userApplication/bankNomineesSlice.js";
import { resetPersonal } from "../../../features/userApplication/personalSlice.js";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    const appUser = await customFetch.get("/users/current-app-user");
    const reponse = await customFetch.get(
      "/applications/user/application-access"
    );
    addAccessToLocalStorage(reponse.data.data);
    store.dispatch(details(appUser.data.data.rows[0]));
    store.dispatch(changeMobile());
    return appUser;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/otplogin");
  }
};

// Main component starts ------
const UserLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutAppUser = async () => {
    dispatch(resetAccessState());
    dispatch(resetBlock());
    dispatch(resetGp());
    dispatch(resetPs());
    dispatch(resetSubdiv());
    dispatch(resetOtpState());
    dispatch(resetUserState());
    dispatch(resetBankNominee());
    dispatch(resetFamily());
    dispatch(resetPersonal());

    await customFetch.get("/auth/user-logout");
    removeAccessFromLocalStorage();

    toast.success(`User logged out`);
    navigate("/otplogin");
  };

  useEffect(() => {
    dispatch(currentAccess());
  }, []);

  return (
    <>
      <UserTopNav logoutAppUser={logoutAppUser} />
      <UserSideBar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <UserFooter />
    </>
  );
};

export default UserLayout;
