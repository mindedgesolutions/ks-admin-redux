import React, { useEffect, useState } from "react";
import Logo from "../../../../assets/images/logo-karmasathi-parijayee-shramik.png";
import { HiOutlineEye } from "react-icons/hi2";
import { Form, Link, redirect } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { generateCaptcha } from "../../../../features/adminLogin/adminLoginSlice";
import { toast } from "react-toastify";
import { splitErrors } from "../../../../utils/showErrors";
import customFetch from "../../../../utils/customFetch";

// Action starts ------
export const action =
  (store) =>
  async ({ request }) => {
    const { captcha } = store.getState().adminLogin;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if (data.inputCaptcha && Number(data.inputCaptcha) !== Number(captcha)) {
      toast.error(`Incorrect captcha! Please try again`);
      store.dispatch(generateCaptcha());
      return null;
    }

    try {
      await customFetch.post("/auth/login", data);
      toast.success(`Login success`);
      return redirect("/admin/dashboard");
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

// Main component starts ------
const AdminLogin = () => {
  document.title = `Admin Login | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const dispatch = useDispatch();
  const { captcha } = useSelector((store) => store.adminLogin);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(generateCaptcha());
  }, []);

  return (
    <div className="row g-0 flex-fill">
      <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
        <div className="container container-tight my-5 px-lg-5">
          <div className="text-center mb-4">
            <Link className="navbar-brand navbar-brand-autodark">
              <img src={Logo} height={70} alt="" />
            </Link>
          </div>
          <h2 className="h3 text-center mb-3">Login to your account</h2>
          <Form method="post" autoComplete="off">
            <div className="mb-3">
              <label className="form-label">Enter username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="deo_souvik"
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
                  type={!visible ? "password" : "text"}
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
                  <HiOutlineEye
                    className="link-secondary cursor-pointer"
                    onClick={() => setVisible(!visible)}
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
                  onClick={() => dispatch(generateCaptcha())}
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
              <button type="submit" className="btn btn-success w-100">
                Sign in
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
  );
};

export default AdminLogin;
