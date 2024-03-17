import React from "react";
import {
  AdminProfileSidebar,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { notifications } from "../../../../utils/data";
import { nanoid } from "nanoid";
import Avatar from "../../../../assets/dist/images/000m.jpg";

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
                <h2 className="mb-2">Notifications</h2>

                <div className="mt-0">&nbsp;</div>

                <div className="list-group list-group-flush list-group-hoverable">
                  {notifications.map((notification) => {
                    return (
                      <div key={nanoid()} className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <img src={Avatar} className="avatar" />
                          </div>
                          <div className="col">
                            <div className="text-reset d-block">
                              {notification.title}
                            </div>
                            <div className="d-block text-secondary mt-n1">
                              {notification.body}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
