import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { TbUserPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { generatedOtp } from "../../features/otplogin/otpLoginSlice";
import { splitErrors } from "../../utils/showErrors";
import customFetch from "../../utils/customFetch";

const LoginMobile = () => {
  const dispatch = useDispatch();
  const { newOtp } = useSelector((store) => store.otpLogin);

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/generate-otp", data);
      const payload = { mobile: data.mobile, otp: response.data.data };
      dispatch(generatedOtp(payload));
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <div className="row">
      <div className="login-bg-main">
        <h1>Login</h1>
        <p>
          We will send you a <span>One Time Password</span> on your valid mobile
          number
        </p>
        <form onSubmit={handleGenerateOtp}>
          <div className="form custom-dashboard-form">
            <div className="form-item form-type-textfield form-item-mobile-no">
              <label>
                Mobile Number/ MWIN <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Valid Mobile number"
                name="mobile"
              />
            </div>
            <div id="message_markup"></div>
            <div id="security_code_replace"></div>
            <div id="submit_replace" className="mt-3">
              <button type="submit" className="btn btn-success w-full">
                Generate OTP
              </button>
            </div>

            <div className="hr-text my-1">or</div>

            <div className="card-body p-0">
              <div className="row">
                <div className="col">
                  <Link to="/user-login" className="btn btn-success w-100">
                    <AiOutlineLogin size={18} className="me-2" />
                    Sign In
                  </Link>
                </div>
                <div className="col">
                  <a href="#" className="btn btn-warning w-100">
                    <TbUserPlus size={18} className="me-2" />
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginMobile;
