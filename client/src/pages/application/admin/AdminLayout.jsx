import React from "react";
import { Outlet } from "react-router-dom";
import { AdminFooter, AdminSideBar, AdminTopNav } from "../../../components";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";

import "react-datepicker/dist/react-datepicker.css";

const AdminLayout = () => {
  return (
    <>
      <AdminTopNav />
      <AdminSideBar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
