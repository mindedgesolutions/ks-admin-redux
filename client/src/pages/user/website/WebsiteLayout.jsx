import React from "react";
import { Outlet } from "react-router-dom";
import { WebsiteFooter, TopNavOne, TopNavTwo } from "../../../components";

// import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/main.css";

const WebsiteLayout = () => {
  return (
    <>
      <TopNavOne />
      <TopNavTwo />
      <Outlet />
      <WebsiteFooter />
    </>
  );
};

export default WebsiteLayout;
