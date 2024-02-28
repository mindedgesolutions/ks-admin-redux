import React from "react";
import { Footer, Header } from "../../components";
import { Outlet } from "react-router-dom";

import "../../assets/css/main.css";

const WebsiteLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default WebsiteLayout;
