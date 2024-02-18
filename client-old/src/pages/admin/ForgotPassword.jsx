import React from "react";
import Logo from "../../assets/dist/images/logo.svg";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

const ForgotPassword = () => {
  document.title = `Forgot Password | ${import.meta.env.VITE_ADMIN_TITLE}`;

  return (
    <div className="d-flex flex-column">
      <div className="page page-center">
        <div className="container container-tight py-4">
          <div className="text-center mb-4">
            <img
              src={Logo}
              className="navbar-brand navbar-brand-autodark"
              height={36}
              alt="karmasathi"
            />
          </div>
          <form className="card card-md" autoComplete="off">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Forgot password</h2>
              <p className="text-muted mb-4">
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
                  <AiOutlineMail className="me-2" />
                  Send me new password
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-muted mt-3">
            Forget it, <Link to="/admin/login">send me back</Link> to the sign
            in screen.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
