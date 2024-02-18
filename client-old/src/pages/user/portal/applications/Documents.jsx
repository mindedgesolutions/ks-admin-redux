import React, { useState } from "react";
import {
  SubmitBtn,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import ApplicationMenu from "../../../../components/user/portal/application/ApplicationMenu";
import Avatar from "../../../../assets/dist/images/000m.jpg";
import customFetch from "../../../../utils/customFetch";

const Documents = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [form, setForm] = useState({
    photo: null,
    aadhaar: null,
    passbook: null,
    selfCertificate: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    setIsIdle(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", form.photo);
    formData.append("aadhaar", form.aadhaar);
    try {
      await customFetch.post(`/applications/user/documents`, formData, {
        onUploadProgress: (ProgressEvent) =>
          console.log(ProgressEvent.progress * 100),
      });
    } catch (error) {}
    setIsIdle(false);
  };

  return (
    <>
      <UserPageHeader title="Upload Documents" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <form onSubmit={handleUpload} encType="multipart/form-data">
                <div className="card-body">
                  <div className="row row-cards">
                    <div className="col-md-12 col-sm-12">
                      <h3 className="card-title">Photo</h3>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img
                            src={Avatar}
                            className="avatar avatar-lg"
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="btn"
                          />
                          <button className="btn btn-ghost-danger ms-3">
                            Clear selection
                          </button>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-5 fst-italic">
                            Upload your photograph <br />( Max size 50kb in jpg
                            / jpeg format, file name should be without space )
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <h3 className="card-title">Aadhaar Card</h3>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img
                            src={Avatar}
                            className="avatar avatar-lg"
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <input
                            type="file"
                            name="aadhaar"
                            onChange={handleChange}
                            className="btn"
                          />
                          <a href="#" className="btn btn-ghost-danger ms-3">
                            Clear selection
                          </a>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-5 fst-italic">
                            Upload scan copy of Aadhaar <br />( Max size 150KB
                            in PDF only, File name should be without space)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row row-cards mt-1">
                    <div className="col-md-12 col-sm-12">
                      <h3 className="card-title">Bank passbook</h3>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img
                            src={Avatar}
                            className="avatar avatar-lg"
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <input
                            type="file"
                            name="passbook"
                            onChange={handleChange}
                            className="btn"
                          />
                          <a href="#" className="btn btn-ghost-danger ms-3">
                            Clear selection
                          </a>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-5 fst-italic">
                            Upload scan copy of Bank Passbook <br />( Max size
                            150KB in PDF only, File name should be without
                            space)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <h3 className="card-title">
                        Application form with self-certificate
                      </h3>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img
                            src={Avatar}
                            className="avatar avatar-lg"
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <input
                            type="file"
                            name="selfCertificate"
                            onChange={handleChange}
                            className="btn"
                          />
                          <a href="#" className="btn btn-ghost-danger ms-3">
                            Clear selection
                          </a>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-5 fst-italic">
                            Upload scan copy of Application Form with Self
                            Certificate <br />( Max size 500KB in PDF only, File
                            name should be without space )
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <h3 className="card-title">Passport</h3>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img
                            src={Avatar}
                            className="avatar avatar-lg"
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <input
                            type="file"
                            name="selfCertificate"
                            onChange={handleChange}
                            className="btn"
                          />
                          <a href="#" className="btn btn-ghost-danger ms-3">
                            Clear selection
                          </a>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-5 fst-italic">
                            Upload scan copy of first page of your passport{" "}
                            <br />( Max size 150KB in PDF only, File name should
                            be without space )
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2"></div>
                  <div className="mt-5">
                    <SubmitBtn text="Upload and preview" isIdle={isIdle} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default Documents;
