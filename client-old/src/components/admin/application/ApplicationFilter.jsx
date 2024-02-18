import React, { useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";

const ApplicationFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [activeStatus, setActiveStatus] = useState(
    searchParams.get("status") || "approved"
  );
  const [searchMwin, setSearchMwin] = useState(searchParams.get("mwin") || "");
  const [searchName, setSearchName] = useState(searchParams.get("name") || "");
  const [searchMobile, setSearchMobile] = useState(
    searchParams.get("mobile") || ""
  );

  const handleStatusChange = (value) => {
    setActiveStatus(value);
    setSearchMwin("");
    setSearchName("");
    setSearchMobile("");
    navigate(`/admin/applications?status=${value}`);
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="btn-list">
            <button
              type="button"
              className={`btn ${
                activeStatus === "all" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("all")}
            >
              All Applications
            </button>
            <button
              type="button"
              className={`btn ${
                activeStatus === "approved" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("approved")}
            >
              Approved Worker List
            </button>
            <button
              type="button"
              className={`btn ${
                activeStatus === "pending" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("pending")}
            >
              Pending for Approval
            </button>
            <button
              type="button"
              className={`btn ${
                activeStatus === "provisional" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("provisional")}
            >
              Provisional Application
            </button>
            <button
              type="button"
              className={`btn ${
                activeStatus === "correction" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("correction")}
            >
              Back for Correction
            </button>
            <button
              type="button"
              className={`btn ${
                activeStatus === "rejected" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("rejected")}
            >
              Rejected Applications
            </button>
          </div>

          <Form>
            <input
              type="hidden"
              name="status"
              value={activeStatus}
              onChange={() => setActiveStatus(activeStatus)}
            />
            <div className="row mt-3">
              <div className="col-md-3">
                <label htmlFor="mwin" className="form-label text-muted">
                  Search by MWIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mwin"
                  id="mwin"
                  value={searchMwin}
                  onChange={(e) => setSearchMwin(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="name" className="form-label text-muted">
                  Search by worker name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="mobile" className="form-label text-muted">
                  Search by mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  id="mobile"
                  value={searchMobile}
                  onChange={(e) => setSearchMobile(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary mt-4">
                  Search
                </button>
                <button
                  type="button"
                  className="btn btn-default ms-3 mt-4"
                  onClick={() => handleStatusChange(activeStatus)}
                >
                  Reset
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFilter;
