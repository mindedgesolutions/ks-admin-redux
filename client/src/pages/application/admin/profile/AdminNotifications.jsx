import React from "react";
import {
  AdminProfileSidebar,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";

const AdminNotifications = () => {
  return (
    <>
      <UserPageHeader title="Notifications" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <AdminProfileSidebar />

            <div className="col d-flex flex-column">
              <div className="card-body">
                <h2 className="mb-4">Change password</h2>

                <div className="mt-4">&nbsp;</div>

                <div className="row">
                  <div className="col-md-4">
                    <InputText
                      type="password"
                      label="Old password"
                      name="oldPass"
                      required={true}
                      value={form.oldPass}
                      handleChange={handleChange}
                      autoFocus={true}
                    />
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
