import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideFamilyModal } from "../../../features/userApplication/familySlice";
import { genderFormat, randomBadgeBg } from "../../../utils/functions";
import { nanoid } from "nanoid";

const ModalViewFamily = () => {
  const dispatch = useDispatch();
  const { visibleF, fMember } = useSelector((store) => store.family);

  const handleCloseFamily = () => {
    dispatch(hideFamilyModal());
  };

  return (
    <Modal centered show={visibleF} size="md" onHide={handleCloseFamily}>
      <Modal.Header closeButton>
        <Modal.Title>{fMember?.member_name?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cards">
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Family member name : </label>
            <label className="form-label">
              {fMember?.member_name?.toUpperCase()}
            </label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
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
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCloseFamily}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewFamily;
