import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { TbUserPlus } from "react-icons/tb";

const Login = () => {
  const generateOtp = (e) => {
    e.preventDefault();
  };

  return (
    <div class="container">
      <div class="region region-content">
        <div id="block-system-main" class="block block-system">
          <div class="content">
            <form id="user-otp-login" onSubmit={generateOtp}>
              <div>
                <div class="row">
                  <div class="login-bg-main">
                    <h1>Login</h1>
                    <p>
                      We will send you a <span>One Time Password</span> on your
                      valid mobile number
                    </p>
                    <div class="form custom-dashboard-form">
                      <div class="form-item form-type-textfield form-item-mobile-no">
                        <label for="edit-mobile-no">
                          Mobile Number/ MWIN{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Valid Mobile number"
                          name="mobile"
                        />
                      </div>
                      <div id="message_markup"></div>
                      <div id="security_code_replace"></div>
                      <div id="submit_replace" class="mt-3">
                        <button
                          type="submit"
                          className="btn btn-success w-full"
                        >
                          Generate OTP
                        </button>
                      </div>
                      <div class="hr-text">or</div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <Link to="/user-login" class="btn w-100">
                              <AiOutlineLogin size={18} className="me-2" />
                              Sign In
                            </Link>
                          </div>
                          <div class="col">
                            <a href="#" class="btn w-100">
                              {/* <!-- Download SVG icon from http://tabler-icons.io/i/brand-twitter --> */}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
