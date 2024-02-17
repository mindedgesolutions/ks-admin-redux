import React, { useState } from "react";
import { PageHeader, PageWrapper, ProfileSidebar } from "../../../components";
import Avatar from "../../../assets/dist/images/000m.jpg";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch("/users/update-user", data);
    toast.success(`Details updated`);
    return redirect("/profile");
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const UpdateProfile = () => {
  document.title = `Update Profile | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const data = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { name, mail, mobile, username } = data.data.rows[0];
  const [inputName, setInputName] = useState(name || "");
  const [inputEmail, setInputEmail] = useState(mail || "");
  const [inputMobile, setInputMobile] = useState(mobile || "");
  const [inputUsername, setInputUsername] = useState(username || "");
  const [inputImg, setInputImg] = useState("");

  const cancelChanges = () => {
    setInputName(name);
    setInputEmail(email);
    setInputMobile(mobile);
    setInputUsername(username);
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const data = Object.fromEntries(formData);
  // };

  return (
    <>
      <PageHeader title="Account settings" />
      <PageWrapper>
        <div className="card">
          <div className="row g-0">
            <ProfileSidebar />

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
                        onChange={(e) => setInputImg(e.target.files[0])}
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
                      <div className="form-label">Name</div>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-label">Username</div>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mt-0">
                    <div className="col-md-6">
                      <div className="form-label">Email</div>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-label">Mobile</div>
                      <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        value={inputMobile}
                        onChange={(e) => setInputMobile(e.target.value)}
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

export default UpdateProfile;
