import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminProfileSidebar = () => {
  const pathname = useLocation();

  return (
    <div className="col-3 d-none d-md-block border-end">
      <div className="card-body">
        <div className="list-group list-group-transparent">
          <Link
            to="/admin/profile"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              pathname.pathname === "/admin/profile" ? "active" : ""
            }`}
          >
            Profile
          </Link>
          <Link
            to="/admin/notifications"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              pathname.pathname === "/admin/notifications" ? "active" : ""
            }`}
          >
            My Notifications
          </Link>
          <Link
            to="/admin/change-password"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              pathname.pathname === "/admin/change-password" ? "active" : ""
            }`}
          >
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSidebar;
