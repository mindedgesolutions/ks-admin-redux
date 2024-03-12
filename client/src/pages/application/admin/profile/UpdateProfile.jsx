import React, { useState } from "react";
import {
  AdminProfileSidebar,
  InputText,
  SubmitBtn,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { Form, redirect } from "react-router-dom";
import Avatar from "../../../../assets/dist/images/000m.jpg";
import { useSelector } from "react-redux";
import customFetch from "../../../../utils/customFetch";
import { toast } from "react-toastify";
import { splitErrors } from "../../../../utils/showErrors";
import { updateDetails } from "../../../../features/admin/adminBasicSlice";

// Action starts ------
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch("/users/update-user", data);
      store.dispatch(updateDetails({ name: data.name, email: data.email }));
      toast.success(`Details updated`);
      return redirect("/admin/profile");
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

// Main component starts ------
const UpdateProfile = () => {
  const { admin } = useSelector((store) => store.adminBasic);
  const [form, setForm] = useState({
    name: admin?.name || "",
    username: admin?.name || "",
    email: admin?.mail || "",
    mobile: "",
    avatar: "",
    isLoading: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cancelChanges = () => {
    setForm({
      ...form,
      name: admin?.name || "",
      username: admin?.name || "",
      email: admin?.mail || "",
      mobile: "",
      avatar: "",
      isLoading: false,
    });
  };

  return (
    <>
      <UserPageHeader title="Account settings" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <AdminProfileSidebar />

            <div className="col d-flex flex-column">
              <Form method="post" autoComplete="off">
                <div className="card-body">
                  <h2 className="mb-4">My account</h2>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <img src={Avatar} className="avatar avatar-xl" />
                    </div>
                    <div className="col-auto">
                      <input
                        type="file"
                        name="avatar"
                        className="btn"
                        onChange={(e) =>
                          setForm({ ...form, avatar: e.target.files[0] })
                        }
                      />
                    </div>
                    <div className="col-auto">
                      <a href="#" className="btn btn-ghost-danger">
                        Delete avatar
                      </a>
                    </div>
                  </div>

                  <div className="mt-4">&nbsp;</div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <InputText
                        label="Name"
                        name="name"
                        required={true}
                        value={form.name}
                        handleChange={handleChange}
                        autoFocus={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputText
                        label="Username"
                        name="username"
                        required={true}
                        value={form.username}
                        handleChange={handleChange}
                        autoFocus={false}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mt-0">
                    <div className="col-md-6">
                      <InputText
                        label="Email"
                        name="email"
                        required={true}
                        value={form.email}
                        handleChange={handleChange}
                        autoFocus={false}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputText
                        label="Mobile"
                        name="mobile"
                        required={true}
                        value={form.mobile}
                        handleChange={handleChange}
                        autoFocus={false}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-footer bg-transparent mt-3">
                  <div className="btn-list justify-content-start">
                    <SubmitBtn text="Save changes" isLoading={form.isLoading} />
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

export default UpdateProfile;
