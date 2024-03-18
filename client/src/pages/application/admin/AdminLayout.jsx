import React from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { AdminFooter, AdminSideBar, AdminTopNav } from "../../../components";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";

import "react-datepicker/dist/react-datepicker.css";
import customFetch from "../../../utils/customFetch.js";
import { splitErrors } from "../../../utils/showErrors.jsx";
import {
  details,
  resetAdminBasic,
} from "../../../features/admin/adminBasicSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setDistricts,
  unsetDistricts,
} from "../../../features/masters/districtSlice.js";
import { resetSubdiv } from "../../../features/masters/subdivSlice.js";
import { resetBlock } from "../../../features/masters/blockSlice.js";
import { unsetSearch } from "../../../features/reports/reportSlice.js";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    const stDist = store.getState().districts;
    const stAdminBasic = store.getState().adminBasic;

    if (stDist.districts.length === 0) {
      const districts = await customFetch.get("/master/districts");
      store.dispatch(setDistricts(districts.data.data.rows));
    }
    if (!stAdminBasic.admin.uid) {
      const response = await customFetch.get("/users/current-user");
      store.dispatch(details(response.data.data.rows[0]));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/admin/login");
  }
};

// Main component starts ------
const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await customFetch.get("/auth/logout");

    dispatch(resetAdminBasic());
    dispatch(unsetDistricts());
    dispatch(resetSubdiv());
    dispatch(resetBlock());
    dispatch(unsetSearch());

    toast.success(`User logged out`);
    navigate("/admin/login");
  };

  return (
    <>
      <AdminTopNav logout={logout} />
      <AdminSideBar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
