import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { unsetDeoApp } from "../../../features/deo/deoSlice";
import { useDispatch, useSelector } from "react-redux";
import { dateFormat } from "../../../utils/functions";
import ModalViewPersonal from "./ModalViewPersonal";
import ModalViewWorksite from "./ModalViewWorksite";
import ModalViewAgency from "./ModalViewAgency";
import ModalViewBank from "./ModalViewBank";
import ModalViewFamily from "./ModalViewFamily";
import ModalViewDocuments from "./ModalViewDocuments";

const ModalViewApplication = () => {
  const dispatch = useDispatch();
  const { deoAppModal, deoAppDetails } = useSelector((store) => store.deo);
  const [activeTab, setActiveTab] = useState("personal");

  let gender;
  switch (deoAppDetails?.gender) {
    case "M":
      gender = `MALE`;
      break;
    case "F":
      gender = `FEMALE`;
      break;
    case "O":
      gender = `OTHER`;
      break;
  }

  const handleCloseModal = () => {
    dispatch(unsetDeoApp());
  };

  return (
    <Modal show={deoAppModal} size="lg" onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Details of{" "}
          <b className="ms-1 text-success">
            {deoAppDetails?.name?.toUpperCase()}
          </b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cards">
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Identification no. : </label>
            <label className="form-label">
              {deoAppDetails?.identification_number}
            </label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Gender : </label>
            <label className="form-label">{gender}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Father / Husband : </label>
            <label className="form-label">
              {deoAppDetails?.father_husband_name?.toUpperCase()}
            </label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">D.O.B : </label>
            <label className="form-label">
              {dateFormat(deoAppDetails?.dob)} ({deoAppDetails?.age})
            </label>
          </div>
        </div>
        <div className="card border-0 mt-0 pt-0">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs nav-fill">
              <li className="nav-item">
                <button
                  className={`nav-link fs-5 text-uppercase ${
                    activeTab === "personal" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fs-5 text-uppercase ${
                    activeTab === "worksite" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("worksite")}
                >
                  Worksite
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fs-5 text-uppercase ${
                    activeTab === "agency" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("agency")}
                >
                  Agency / Employer
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fs-5 text-uppercase ${
                    activeTab === "bank" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("bank")}
                >
                  Bank & Nominee
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fs-5 text-uppercase ${
                    activeTab === "family" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("family")}
                >
                  Family details
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fs-5 text-uppercase ${
                    activeTab === "documents" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("documents")}
                >
                  Documents
                </button>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <ModalViewPersonal activeTab={activeTab} />
              <ModalViewWorksite activeTab={activeTab} />
              <ModalViewAgency activeTab={activeTab} />
              <ModalViewBank activeTab={activeTab} />
              <ModalViewFamily activeTab={activeTab} />
              <ModalViewDocuments activeTab={activeTab} />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewApplication;
