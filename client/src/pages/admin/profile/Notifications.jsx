import React from "react";
import { PageHeader, PageWrapper, ProfileSidebar } from "../../../components";
import Avatar from "../../../assets/dist/images/000m.jpg";
import { notifications } from "../../../utils/data";
import { nanoid } from "nanoid";

const Notifications = () => {
  document.title = `Notifications | ${import.meta.env.VITE_ADMIN_TITLE}`;

  return (
    <>
      <PageHeader title="Notifications" />
      <PageWrapper>
        <div className="card">
          <div className="row g-0">
            <ProfileSidebar />

            <div className="col d-flex flex-column">
              <div className="card-body">
                <h2 className="mb-4">My notifications</h2>

                <div className="card-body">
                  <div className="divide-y">
                    {notifications.map((notification) => {
                      const id = nanoid();
                      const { title, body, name, date, avatar } = notification;
                      const nameArray = name.split(" ");
                      const initials = nameArray.map((word) => {
                        return word.charAt(0).toUpperCase();
                      });
                      const nameInitials = initials.join("");

                      return (
                        <div key={id}>
                          <div className="row">
                            <div className="col-auto">
                              {avatar ? (
                                <img src={Avatar} className="avatar" />
                              ) : (
                                <span className="avatar">{nameInitials}</span>
                              )}
                            </div>
                            <div className="col" title={body}>
                              <div className="fw-bold tt-uppercase text-uppercase">
                                {title}
                              </div>
                              <div className="text-truncate">{body}</div>
                              <div className="text-muted mt-2">
                                {name}, {date}
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
        </div>
      </PageWrapper>
    </>
  );
};

export default Notifications;
