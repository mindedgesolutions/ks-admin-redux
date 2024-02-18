import React, { useEffect, useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { IoReloadOutline } from "react-icons/io5";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";

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

const OtpLoginForm = ({ inputMobile, setOtp, otp }) => {
  const navigation = useNavigation();
  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(2);
  const [captchaTotal, setCaptchaTotal] = useState(3);
  const min = 1;
  const max = 10;

  const handleReset = () => {
    setOtp("");
  };

  const generateCaptcha = async () => {
    const numOne = Math.floor(Math.random() * (max - min + 1)) + min;
    const numTwo = Math.floor(Math.random() * (max - min + 1)) + min;
    setFirstNumber(numOne);
    setSecondNumber(numTwo);
    setCaptchaTotal(Number(numOne) + Number(numTwo));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);
  console.log(otp.data.data);

  if (navigation.state === "submitting") {
    return `Logging in. Please wait ...`;
  }

  return (
    <Form method="post">
      <input
        type="hidden"
        name="captchaTotal"
        value={captchaTotal}
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
                    defaultValue={inputMobile}
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
                  <div className="">
                    {firstNumber} + {secondNumber}
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
                  <button type="submit" className="btn btn-success me-3">
                    Login
                  </button>
                  <button type="button" className="btn btn-default me-3">
                    Resend
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleReset}
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

export default OtpLoginForm;
