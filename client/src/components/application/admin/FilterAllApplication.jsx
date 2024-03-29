import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FilterAllApplication = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [activeStatus, setActiveStatus] = useState(
    searchParams.get("status") || "approved"
  );
  const [form, setForm] = useState({
    searchStatus: "approved",
    searchMwin: "",
    searchName: "",
    searchMobile: "",
  });

  const handleStatusChange = (e) => {
    setForm({ ...form, searchStatus: e });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="btn-list">
            <button
              type="button"
              className={`btn ${
                form.searchStatus === "all" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("all")}
            >
              All Applications
            </button>
            <button
              type="button"
              className={`btn ${
                form.searchStatus === "approved" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("approved")}
            >
              Approved Worker List
            </button>
            <button
              type="button"
              className={`btn ${
                form.searchStatus === "pending" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("pending")}
            >
              Pending for Approval
            </button>
            <button
              type="button"
              className={`btn ${
                form.searchStatus === "provisional" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("provisional")}
            >
              Provisional Application
            </button>
            <button
              type="button"
              className={`btn ${
                form.searchStatus === "correction" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("correction")}
            >
              Back for Correction
            </button>
            <button
              type="button"
              className={`btn ${
                form.searchStatus === "rejected" ? "btn-success active" : ""
              }`}
              onClick={() => handleStatusChange("rejected")}
            >
              Rejected Applications
            </button>
          </div>

          <Form>
            <input type="hidden" name="status" value={form.searchStatus} />
            <div className="row mt-3">
              <div className="col-md-3">
                <label htmlFor="searchMwin" className="form-label text-muted">
                  Search by MWIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="searchMwin"
                  id="searchMwin"
                  value={form.searchMwin}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="searchName" className="form-label text-muted">
                  Search by worker name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="searchName"
                  id="searchName"
                  value={form.searchName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="searchMobile" className="form-label text-muted">
                  Search by mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="searchMobile"
                  id="searchMobile"
                  value={form.searchMobile}
                  onChange={handleChange}
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

export default FilterAllApplication;
