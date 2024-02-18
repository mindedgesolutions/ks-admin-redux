import React from "react";
import Logo from "../../assets/dist/images/logo.png";

const PageLoader = () => {
  return (
    <div className="page page-center vh-80">
      <div className="container container-slim py-4">
        <div className="text-center">
          <div className="mb-3">
            <a href="." className="navbar-brand navbar-brand-autodark">
              <img src={Logo} alt="" />
            </a>
          </div>
          <h3 className="text-muted mb-3">Loading data ...</h3>
          <div className="progress progress-sm">
            <div className="progress-bar progress-bar-indeterminate"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
