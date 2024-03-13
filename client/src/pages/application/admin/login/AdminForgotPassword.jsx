import React from "react";
import Logo from "../../../../assets/images/logo-karmasathi-parijayee-shramik.png";
import { Form, Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data.email);
  return null;
};

const AdminForgotPassword = () => {
  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <Link
            to="/admin/login"
            className="navbar-brand navbar-brand-autodark"
          >
            <img
              src={Logo}
              height={60}
              alt={import.meta.env.VITE_ADMIN_TITLE}
              // className="navbar-brand-image"
            />
          </Link>
        </div>
        <Form className="card card-md" method="post" autoComplete="off">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Forgot password</h2>
            <p className="text-secondary mb-4">
              Enter your email address and your password will be reset and
              emailed to you.
            </p>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-success w-100">
                {/* <!-- Download SVG icon from http://tabler-icons.io/i/mail --> */}
                <CiMail size={18} className="me-2" />
                Send me new password
              </button>
            </div>
          </div>
        </Form>
        <div className="text-center text-secondary mt-3">
          Forget it, <Link to="/admin/login">send me back</Link> to the sign in
          screen.
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
