import React from "react";
import {
  AdminProfileSidebar,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { notifications } from "../../../../utils/data";

const AdminNotifications = () => {
  document.title = `Admin Notifications | ${import.meta.env.VITE_ADMIN_TITLE}`;
  return (
    <>
      <UserPageHeader title="Notifications" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <AdminProfileSidebar />

            <div className="col d-flex flex-column">
              <div className="card-body">
                <h2 className="mb-4">Notifications</h2>

                <div className="mt-4">&nbsp;</div>

                <div className="row">
                  <div className="col-md-4">
                    {notifications.map((notification) => {
                      return (
                        <span>
                          <h1>{notification.title}</h1>
                          <p>{notification.body}</p>
                          <p>{notification.date}</p>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default AdminNotifications;
