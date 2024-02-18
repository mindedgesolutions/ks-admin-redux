import React from "react";
import Logo from "../../../assets/images/logo-karmasathi-parijayee-shramik.png";

const UserLoader = () => {
  return (
    <div className="page page-center">
      <div className="container container-slim py-4">
        <div className="text-center">
          <div className="mb-3">
            <a href="." className="navbar-brand navbar-brand-autodark">
              <img
                src={Logo}
                height="36"
                alt={import.meta.env.VITE_USER_TITLE}
              />
            </a>
          </div>
          <div className="text-muted mb-3">Loading ...</div>
          <div className="progress progress-sm">
            <div className="progress-bar progress-bar-indeterminate"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoader;
