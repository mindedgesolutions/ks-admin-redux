import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetDeo } from "../../../features/deo/deoSlice";
import { Modal } from "react-bootstrap";

const ModalDeoDetails = () => {
  const dispatch = useDispatch();
  const { viewDeo, deoModal } = useSelector((store) => store.deo);

  const handleCloseModal = () => {
    dispatch(unsetDeo());
  };

  return (
    <Modal show={deoModal} size="lg" onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{viewDeo?.name?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cards">
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">DEO name : </label>
            <label className="form-label">{viewDeo?.name?.toUpperCase()}</label>
          </div>
          {/* <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Gender : </label>
            <label className="form-label">
              {genderFormat(fMember?.member_gender)?.toUpperCase()}
            </label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Age : </label>
            <label className="form-label">
              {fMember?.member_age} Years old
            </label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Relationship : </label>
            <label className="form-label">
              {fMember?.member_relationship?.toUpperCase()}
            </label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Aadhaar no.</label>
            <label className="form-label">{fMember?.member_aadhar_no}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">EPIC : </label>
            <label className="form-label">{fMember?.member_epic || "NA"}</label>
          </div>
          <div className="mb-3 col-md-12 mt-0 pt-0">
            <label className="datagrid-title">Schemes : </label>
            <br />
            {fMember?.member_schemes?.map((scheme) => {
              return (
                <span
                  key={nanoid()}
                  className={`badge bg-${randomBadgeBg()}-lt p-2 me-2 my-1`}
                >
                  {scheme?.schemes_name?.toUpperCase()}
                </span>
              );
            })}
          </div> */}
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

export default ModalDeoDetails;
