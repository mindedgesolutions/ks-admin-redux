import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getAccessFromLocalStorage } from "../../../../utils/data";

const ApplicationMenu = () => {
  const location = useLocation();
  const availableAccess = getAccessFromLocalStorage();

  return (
    <div className="col-3 d-none d-md-block border-end">
      <div className="card-body">
        <div className="list-group list-group-transparent">
          {availableAccess.personal && (
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

          {availableAccess.worksite && (
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

          {availableAccess.agency && (
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

          {availableAccess.bank && (
            <Link to="/user/nominee-info" className="text-decoration-none">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  location.pathname === "/user/nominee-info" ? "active" : ""
                }`}
              >
                Bank & Nominee
              </button>
            </Link>
          )}

          {availableAccess.family && (
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

          {availableAccess.doc && (
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
        </div>
      </div>
    </div>
  );
};

export default ApplicationMenu;
