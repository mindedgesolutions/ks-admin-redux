import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileSidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="col-3 d-none d-md-block border-end">
      <div className="card-body">
        <h4 className="subheader">Settings</h4>
        <div className="list-group list-group-transparent">
          <Link
            to="/admin/profile"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              pathname === "/profile" ? "active" : ""
            }`}
          >
            My Account
          </Link>
          <Link
            to="/admin/notifications"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              pathname === "/notifications" ? "active" : ""
            }`}
          >
            My Notifications
          </Link>
          <Link
            to="/admin/change-password"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              pathname === "/change-password" ? "active" : ""
            }`}
          >
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
