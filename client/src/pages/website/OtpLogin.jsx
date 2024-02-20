import React, { useState } from "react";
import { LoginForm, LoginMobile } from "../../components";
import { useSelector } from "react-redux";

const OtpLogin = () => {
  document.title = `OTP Login | ${import.meta.env.VITE_WEBSITE_TITLE}`;
  const { newOtp } = useSelector((store) => store.otpLogin);

  return (
    <div className="container">
      <div className="region region-content">
        <div id="block-system-main" className="block block-system">
          <div className="content">
            {!newOtp ? <LoginMobile /> : <LoginForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;
