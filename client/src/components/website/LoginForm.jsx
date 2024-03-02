import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useNavigation } from "react-router-dom";
import { changeMobile } from "../../features/otplogin/otpLoginSlice";
import { IoReloadOutline } from "react-icons/io5";
import { splitErrors } from "../../utils/showErrors";
import customFetch from "../../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/otplogin", data);
    if (response.data.userAccess) {
      return redirect("/user/dashboard");
    }
    return redirect("/user/personal-info");
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const { newMobile, newOtp } = useSelector((store) => store.otpLogin);
  const [captcha, setCaptcha] = useState({
    firstNumber: 1,
    secondNumber: 2,
    captchaTotal: 3,
  });
  const min = 1;
  const max = 10;

  const generateCaptcha = () => {
    const numOne = Math.floor(Math.random() * (max - min + 1)) + min;
    const numTwo = Math.floor(Math.random() * (max - min + 1)) + min;
    const total = Number(numOne) + Number(numTwo);
    setCaptcha({
      ...captcha,
      firstNumber: numOne,
      secondNumber: numTwo,
      captchaTotal: total,
    });
  };

  console.log(newOtp);

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <Form method="post">
      <input
        type="hidden"
        name="captchaTotal"
        value={captcha.captchaTotal}
        onChange={() => {}}
      />
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
                    value={newMobile}
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
                    disabled={isLoading}
                  />
                </div>
                <div className="form-item mt-3">
                  <label>
                    Enter captcha <span className="text-danger">*</span>
                  </label>
                  <div className="">
                    {captcha.firstNumber} + {captcha.secondNumber}
                    <IoReloadOutline
                      className="ms-3 cursor-pointer"
                      onClick={generateCaptcha}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter captcha"
                    name="inputCaptcha"
                    disabled={isLoading}
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="btn btn-success me-3"
                    disabled={isLoading}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-default me-3"
                    disabled={isLoading}
                  >
                    Resend
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => dispatch(changeMobile())}
                    disabled={isLoading}
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
