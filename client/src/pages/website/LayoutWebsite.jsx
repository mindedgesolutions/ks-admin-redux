import React from "react";
import { Outlet } from "react-router-dom";
import { TopMenu } from "../../components";

const LayoutWebsite = () => {
  return (
    <>
      <TopMenu />
      <Outlet />
    </>
  );
};

export default LayoutWebsite;
