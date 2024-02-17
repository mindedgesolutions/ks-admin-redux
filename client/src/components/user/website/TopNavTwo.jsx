import React from "react";
import { Link } from "react-router-dom";
import ParijayeeShramik from "../../../assets/images/logo-karmasathi-parijayee-shramik.png";
import { FaCircleUser } from "react-icons/fa6";

const TopNavTwo = () => {
  return (
    <div className="header-logo-row">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img
              src={ParijayeeShramik}
              className="d-block w-100"
              alt={import.meta.env.VITE_ADMIN_TITLE}
            />
          </div>
          <div className="col-8">
            <div className="topnav">
              <Link to="/">Home</Link>
              <Link to="/notifications">Notifications</Link>
              <Link to="/schemes">Schemes</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/stakeholders">Stakeholders</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/otplogin">
                <FaCircleUser size={30} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavTwo;
