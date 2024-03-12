import React from "react";
import Logo from "../../../assets/images/logo-karmasathi-parijayee-shramik.png";

const UserAppLoader = () => {
  return (
    <div className="card-body content-center">
      <div className="row justify-content-md-center">
        <div className="mb-3 text-center">
          <img src={Logo} height={50} alt={import.meta.env.VITE_USER_TITLE} />
        </div>
        <div className="col-md-4 col-sm-12 mt-3">
          <div className="progress progress-sm">
            <div className="progress-bar progress-bar-indeterminate"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAppLoader;
