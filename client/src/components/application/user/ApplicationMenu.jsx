import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const ApplicationMenu = () => {
  const location = useLocation();
  const { userAccess } = useSelector((store) => store.user);

  return (
    <div className="col-3 d-none d-md-block border-end">
      <div className="card-body">
        <div className="list-group list-group-transparent">
          {userAccess.personal && (
            <Link to="/user/personal-info" className="text-decoration-none">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  location.pathname === "/user/personal-info" ? "active" : ""
                }`}
              >
                Personal
              </button>
            </Link>
          )}

          {userAccess.worksite && (
            <Link to="/user/worksite-info" className="text-decoration-none">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  location.pathname === "/user/worksite-info" ? "active" : ""
                }`}
              >
                Worksite
              </button>
            </Link>
          )}

          {userAccess.agency && (
            <Link to="/user/agency-info" className="text-decoration-none">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  location.pathname === "/user/agency-info" ? "active" : ""
                }`}
              >
                Agency / Employer
              </button>
            </Link>
          )}

          {userAccess.bank && (
            <Link to="/user/bank-nominee-info" className="text-decoration-none">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  location.pathname === "/user/bank-nominee-info"
                    ? "active"
                    : ""
                }`}
              >
                Bank & Nominee
              </button>
            </Link>
          )}

          {userAccess.family && (
            <Link to="/user/family-info" className="text-decoration-none">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  location.pathname === "/user/family-info" ? "active" : ""
                }`}
              >
                Family details
              </button>
            </Link>
          )}

          {userAccess.doc && (
            <Link to="/user/documents" className="text-decoration-none">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  location.pathname === "/user/documents" ? "active" : ""
                }`}
              >
                Documents
              </button>
            </Link>
          )}

          {userAccess.personal &&
            userAccess.worksite &&
            userAccess.agency &&
            userAccess.bank &&
            userAccess.family &&
            userAccess.doc && (
              <Link to="/user/overview" className="text-decoration-none">
                <button
                  type="button"
                  className={`list-group-item list-group-item-action d-flex align-items-center`}
                >
                  Overview
                </button>
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationMenu;
