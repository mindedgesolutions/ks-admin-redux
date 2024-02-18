import React, { useState } from "react";
import {
  Action,
  ApplicantBasicInfo,
  Documents,
  PageHeader,
  PageWrapper,
  Remarks,
  WorksiteInfo,
} from "../../../components";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const master = await customFetch.get(`/applications/single/${id}`);
    return { master };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const ApplicationSingle = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const { master } = useLoaderData();
  document.title = `Application of ${master.data.data.rows[0].name.toUpperCase()} | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;

  const breadCrumb = (
    <Link onClick={() => navigate(-1)}>Back to Applications</Link>
  );

  return (
    <>
      <PageHeader title="Application" breadCrumb={breadCrumb} />
      <PageWrapper>
        <div className="card pe-0">
          <div className="row g-0">
            <Action />

            <div className="col-md-6">
              <div className="card-body px-1">
                <div className="col-md-12">
                  <div className="card p-0">
                    <div className="card-header">
                      <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item" role="action">
                          <button
                            className={`nav-link ${
                              activeTab === "basic" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("basic")}
                          >
                            Basic Info
                          </button>
                        </li>
                        <li className="nav-item" role="worksite">
                          <button
                            className={`nav-link ${
                              activeTab === "worksite" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("worksite")}
                          >
                            Worksite info
                          </button>
                        </li>
                        <li className="nav-item" role="remarks">
                          <button
                            className={`nav-link ${
                              activeTab === "remarks" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("remarks")}
                          >
                            Remarks
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        {activeTab === "basic" && (
                          <ApplicantBasicInfo master={master} />
                        )}
                        {activeTab === "worksite" && <WorksiteInfo />}
                        {activeTab === "remarks" && <Remarks />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <Documents master={master} />
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default ApplicationSingle;
