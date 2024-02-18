import React, { useState } from "react";
import { PageHeader, PageWrapper, ProfileSidebar } from "../../../components";
import { Form, redirect, useNavigation } from "react-router-dom";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch("/users/change-password", data);
    toast.success(`Password changed successfully`);
    return redirect("/profile");
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const ChangePassword = () => {
  document.title = `Change Password | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [inputOldPass, setInputOldPass] = useState("");
  const [inputNewPass, setInputNewPass] = useState("");
  const [inputConfirmPass, setInputConfirmPass] = useState("");

  const cancelChanges = () => {
    setInputOldPass("");
    setInputNewPass("");
    setInputConfirmPass("");
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault()
  //   const formData = new FormData(e.currentTarget)
  //   const data = Object.fromEntries(formData)
  // }

  return (
    <>
      <PageHeader title="Change password" />
      <PageWrapper>
        <div className="card">
          <div className="row g-0">
            <ProfileSidebar />

            <div className="col d-flex flex-column">
              <Form method="post" autoComplete="off">
                <div className="card-body">
                  <h2 className="mb-4">Change password</h2>

                  <div className="mt-4">&nbsp;</div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-label">
                        Old password <span className="text-danger">*</span>
                      </div>
                      <input
                        type="password"
                        name="oldPass"
                        className="form-control"
                        value={inputOldPass}
                        onChange={(e) => setInputOldPass(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="form-label">
                        New password <span className="text-danger">*</span>
                      </div>
                      <input
                        type="password"
                        name="newPass"
                        className="form-control"
                        value={inputNewPass}
                        onChange={(e) => setInputNewPass(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="form-label">
                        Confirm password <span className="text-danger">*</span>
                      </div>
                      <input
                        type="password"
                        name="confirmPass"
                        className="form-control"
                        value={inputConfirmPass}
                        onChange={(e) => setInputConfirmPass(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-footer bg-transparent mt-3">
                  <div className="btn-list justify-content-start">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? `Saving changes ...` : `Save changes`}
                    </button>
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
      </PageWrapper>
    </>
  );
};

export default ChangePassword;
