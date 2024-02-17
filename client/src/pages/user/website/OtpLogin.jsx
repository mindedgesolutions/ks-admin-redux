import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { TbUserPlus } from "react-icons/tb";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { OtpLoginForm } from "../../../components";
import { nanoid } from "nanoid";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [inputMobile, setInputMobile] = useState("");

  const generateOtp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const newOtp = await customFetch.post("/auth/generate-otp", data);
      setOtp(newOtp);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <div className="container">
      <div className="region region-content">
        <div id="block-system-main" className="block block-system">
          {!otp && (
            <div className="content">
              <form id="user-otp-login" onSubmit={generateOtp}>
                <div>
                  <div className="row">
                    <div className="login-bg-main">
                      <h1>Login</h1>
                      <p>
                        We will send you a <span>One Time Password</span> on
                        your valid mobile number
                      </p>
                      <div className="form custom-dashboard-form">
                        <div className="form-item form-type-textfield form-item-mobile-no">
                          <label>
                            Mobile Number/ MWIN{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Valid Mobile number"
                            name="mobile"
                            onChange={(e) => setInputMobile(e.target.value)}
                          />
                        </div>
                        <div id="message_markup"></div>
                        <div id="security_code_replace"></div>
                        <div id="submit_replace" className="mt-3">
                          <button
                            type="submit"
                            className="btn btn-success w-full"
                          >
                            Generate OTP
                          </button>
                        </div>

                        <div className="hr-text">or</div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col">
                              <Link to="/user-login" className="btn w-100">
                                <AiOutlineLogin size={18} className="me-2" />
                                Sign In
                              </Link>
                            </div>
                            <div className="col">
                              <a href="#" className="btn w-100">
                                <TbUserPlus size={18} className="me-2" />
                                Sign Up
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {otp && (
            <OtpLoginForm otp={otp} setOtp={setOtp} inputMobile={inputMobile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
