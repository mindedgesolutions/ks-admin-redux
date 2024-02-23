import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useNavigation } from "react-router-dom";
import { changeMobile } from "../../features/otplogin/otpLoginSlice";
import customFetch from "../../utils/customFetch";
import { splitErrors } from "../../utils/showErrors";
import { IoReloadOutline } from "react-icons/io5";

// Action starts ------
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

// Main component starts ------
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const { newMobile, newOtp } = useSelector((store) => store.otpLogin);
  const max = 1;
  const min = 9;

  const [captcha, setCaptcha] = useState({
    firstNumber: 1,
    secondNumber: 2,
    captchaTotal: 3,
  });

  const generateCaptcha = async () => {
    const numOne = Math.floor(Math.random() * (max - min + 1)) + min;
    const numTwo = Math.floor(Math.random() * (max - min + 1)) + min;
    setCaptcha({
      ...captcha,
      firstNumber: numOne,
      secondNumber: numTwo,
      captchaTotal: Number(numOne) + Number(numTwo),
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  console.log(newOtp);

  return (
    <Form method="post">
      <div className="content">
        <input
          type="hidden"
          name="captchaTotal"
          value={captcha.captchaTotal}
          onChange={() => {}}
        />
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
