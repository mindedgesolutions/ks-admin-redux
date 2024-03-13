import React, { useState } from "react";
import {
  AdminProfileSidebar,
  InputText,
  SubmitBtn,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../../../utils/customFetch";
import { toast } from "react-toastify";
import { splitErrors } from "../../../../utils/showErrors";

// Action starts ------
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch("/users/change-password", data);
    toast.success(`Password changed successfully`);
    return redirect("/admin/profile");
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const ChangePassword = () => {
  document.title = `Change Password | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const [form, setForm] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cancelChanges = () => {
    setForm({
      ...form,
      oldPass: "",
      newPass: "",
      confirmPass: "",
    });
  };

  return (
    <>
      <UserPageHeader title="Change password" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <AdminProfileSidebar />

            <div className="col d-flex flex-column">
              <Form method="post" autoComplete="off">
                <div className="card-body">
                  <h2 className="mb-2">Change password</h2>

                  <div className="mt-0">&nbsp;</div>

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
                    <div className="col-md-4">
                      <InputText
                        type="password"
                        label="New password"
                        name="newPass"
                        required={true}
                        value={form.newPass}
                        handleChange={handleChange}
                        autoFocus={false}
                      />
                    </div>
                    <div className="col-md-4">
                      <InputText
                        type="password"
                        label="Confirm password"
                        name="confirmPass"
                        required={true}
                        value={form.confirmPass}
                        handleChange={handleChange}
                        autoFocus={false}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-footer bg-transparent mt-3">
                  <div className="btn-list justify-content-start">
                    <SubmitBtn text="Change password" isLoading={isLoading} />
                    <button
                      type="button"
                      className="btn"
                      onClick={cancelChanges}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default ChangePassword;
