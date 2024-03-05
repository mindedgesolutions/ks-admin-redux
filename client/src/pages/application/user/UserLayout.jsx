import React, { useEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { UserTopNav, UserSideBar, UserFooter } from "../../../components";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";

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
    return null;
    return redirect("/otplogin");
  }
};

// Main component starts ------
const UserLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutAppUser = async () => {
    await customFetch.get("/auth/user-logout");
    removeAccessFromLocalStorage();

    dispatch(resetAccessState());
    dispatch(resetOtpState());
    dispatch(resetUserState());
    dispatch(resetFamily());

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
