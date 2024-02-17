import React, { useState } from "react";
import Logo from "../../assets/dist/images/logo.png";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { splitErrors } from "../../utils/showErrors";
import customFetch from "../../utils/customFetch.js";
import { toast } from "react-toastify";
import { MdOutlineRefresh } from "react-icons/md";
import { generateRandomNumber } from "../../utils/functions.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success(`Login success`);
    return redirect("/admin/dashboard");
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  document.title = `Login | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const [passwordType, setPasswordType] = useState("password");
  const [captcha, setCaptcha] = useState(generateRandomNumber);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const generateNewCaptcha = () => {
    const newCaptcha = generateRandomNumber();
    setCaptcha(newCaptcha);
  };

  return (
    <div className="d-flex flex-column bg-white">
      <div className="row g-0 flex-fill">
        <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
          <div className="container container-tight my-5 px-lg-5">
            <div className="text-center mb-4">
              <img
                src={Logo}
                className="navbar-brand navbar-brand-autodark"
                width={350}
                alt="karmasathi"
              />
            </div>
            <h2 className="h3 text-center mb-3">Login to your account</h2>
            <Form method="post" autoComplete="off">
              <input
                type="hidden"
                name="captcha"
                value={captcha}
                onChange={() => {}}
              />
              <div className="mb-3">
                <label className="form-label">Enter username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="your@email.com"
                  defaultValue="deo_souvik"
                  onPaste={(e) => {
                    e.preventDefault();
                  }}
                  onCopy={(e) => {
                    e.preventDefault();
                  }}
                  onCut={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Password
                  <span className="form-label-description">
                    <Link to="/admin/forgot-password">I forgot password</Link>
                  </span>
                </label>
                <div className="input-group input-group-flat">
                  <input
                    type={passwordType}
                    name="password"
                    className="form-control"
                    placeholder="Your password"
                    defaultValue="welcome123"
                    onPaste={(e) => {
                      e.preventDefault();
                    }}
                    onCopy={(e) => {
                      e.preventDefault();
                    }}
                    onCut={(e) => {
                      e.preventDefault();
                    }}
                  />
                  <span className="input-group-text">
                    {/* <!-- Download SVG icon from http://tabler-icons.io/i/eye --> */}
                    <IoEyeOutline
                      className="link-secondary cursor-pointer"
                      title="show password"
                      onClick={showPassword}
                    />
                  </span>
                </div>
              </div>
              <div className="row row-cards mb-3">
                <div className="col-sm-5 col-md-5">
                  <div className="bg-secondary-subtle bg-gradient w-full h-full rounded text-center pt-4 fw-bold fs-2">
                    {captcha}
                  </div>
                </div>
                <div className="col-sm-1 col-md-1 pt-5 align-center">
                  <MdOutlineRefresh
                    size={24}
                    className="cursor-pointer"
                    onClick={generateNewCaptcha}
                  />
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Enter captcha</label>
                    <input
                      type="text"
                      name="inputCaptcha"
                      className="form-control"
                      placeholder="Enter captcha"
                      onPaste={(e) => {
                        e.preventDefault();
                      }}
                      onCopy={(e) => {
                        e.preventDefault();
                      }}
                      onCut={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? `Signing in ...` : `Sign in`}
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
          {/* <!-- Photo --> */}
          <div
            className="bg-cover h-100 min-vh-100"
            style={{ backgroundImage: "url(../../login-bg.jpg)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
