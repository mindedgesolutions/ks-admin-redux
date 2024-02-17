import React, { useState } from "react";
import {
  SubmitBtn,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";

const OverView = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [currentTab, setCurrentTab] = useState("personal");

  return (
    <>
      <UserPageHeader title="Overview Application" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <div className="row row-cards">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                        <button
                          className={
                            currentTab === "personal"
                              ? `nav-link active`
                              : `nav-link`
                          }
                          onClick={() => setCurrentTab("personal")}
                        >
                          Personal
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={
                            currentTab === "worksite"
                              ? `nav-link active`
                              : `nav-link`
                          }
                          onClick={() => setCurrentTab("worksite")}
                        >
                          Worksite
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={
                            currentTab === "agency"
                              ? `nav-link active`
                              : `nav-link`
                          }
                          onClick={() => setCurrentTab("agency")}
                        >
                          Agency / Employer
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={
                            currentTab === "nominee"
                              ? `nav-link active`
                              : `nav-link`
                          }
                          onClick={() => setCurrentTab("nominee")}
                        >
                          Bank & Nominee
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={
                            currentTab === "family"
                              ? `nav-link active`
                              : `nav-link`
                          }
                          onClick={() => setCurrentTab("family")}
                        >
                          Family details
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={
                            currentTab === "documents"
                              ? `nav-link active`
                              : `nav-link`
                          }
                          onClick={() => setCurrentTab("documents")}
                        >
                          Documents
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className={
                          currentTab === "personal"
                            ? `tab-pane active show`
                            : `tab-pane`
                        }
                      >
                        <h4>Personal Information</h4>
                        <div>
                          Cursus turpis vestibulum, dui in pharetra vulputate id
                          sed non turpis ultricies fringilla at sed facilisis
                          lacus pellentesque purus nibh
                        </div>
                      </div>
                      <div
                        className={
                          currentTab === "worksite"
                            ? `tab-pane active show`
                            : `tab-pane`
                        }
                      >
                        <h4>Worksite Information</h4>
                        <div>
                          Fringilla egestas nunc quis tellus diam rhoncus
                          ultricies tristique enim at diam, sem nunc amet,
                          pellentesque id egestas velit sed
                        </div>
                      </div>
                      <div
                        className={
                          currentTab === "agency"
                            ? `tab-pane active show`
                            : `tab-pane`
                        }
                      >
                        <h4>Agency / Employer Information</h4>
                        <div>
                          Donec ac vitae diam amet vel leo egestas consequat
                          rhoncus in luctus amet, facilisi sit mauris accumsan
                          nibh habitant senectus
                        </div>
                      </div>
                      <div
                        className={
                          currentTab === "nominee"
                            ? `tab-pane active show`
                            : `tab-pane`
                        }
                      >
                        <h4>Bank & Nominee Information</h4>
                        <div>
                          Cursus turpis vestibulum, dui in pharetra vulputate id
                          sed non turpis ultricies fringilla at sed facilisis
                          lacus pellentesque purus nibh
                        </div>
                      </div>
                      <div
                        className={
                          currentTab === "family"
                            ? `tab-pane active show`
                            : `tab-pane`
                        }
                      >
                        <h4>Family Information</h4>
                        <div>
                          Fringilla egestas nunc quis tellus diam rhoncus
                          ultricies tristique enim at diam, sem nunc amet,
                          pellentesque id egestas velit sed
                        </div>
                      </div>
                      <div
                        className={
                          currentTab === "documents"
                            ? `tab-pane active show`
                            : `tab-pane`
                        }
                      >
                        <h4>Documents</h4>
                        <div>
                          Donec ac vitae diam amet vel leo egestas consequat
                          rhoncus in luctus amet, facilisi sit mauris accumsan
                          nibh habitant senectus
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-header">
            <SubmitBtn isIdle={isIdle} />
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default OverView;
