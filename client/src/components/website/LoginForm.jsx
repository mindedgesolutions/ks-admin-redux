import React from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { changeMobile } from "../../features/otplogin/otpLoginSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <Form method="post">
      <div className="content">
        <div>
          <div className="row">
            <div className="login-bg-main">
              <h1>Enter OTP</h1>
              <p>Enter OTP sent to your mobile</p>
              <div className="form custom-dashboard-form">
                <div className="form-item mt-3">
                  <label>
                    Mobile Number/ MWIN <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Valid Mobile number"
                    name="mobile"
                    readOnly={true}
                  />
                </div>
                <div className="form-item mt-3">
                  <label>
                    Enter OTP <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    name="inputOtp"
                  />
                </div>
                <div className="form-item mt-3">
                  <label>
                    Enter captcha <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter captcha"
                    name="inputCaptcha"
                  />
                </div>
                <div className="mt-5">
                  <button type="submit" className="btn btn-success me-3">
                    Login
                  </button>
                  <button type="button" className="btn btn-default me-3">
                    Resend
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => dispatch(changeMobile())}
                  >
                    Change Mobile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
