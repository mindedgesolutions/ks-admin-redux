import React from "react";
import { dateFormat, genderFormat } from "../../../utils/functions";

const ApplicantBasicInfo = ({ master }) => {
  const {
    identification_number,
    name,
    father_husband_name,
    dob,
    gender,
    mobile,
    emergency_contact_no,
    permanent_address,
    khadyasathi_no,
  } = master.data.data.rows[0];

  return (
    <div className="d-none d-md-block">
      <div className="row row-cards">
        <div className="col-sm-12 col-md-12">
          <div className="mb-2">
            <label className="form-label text-muted">Identification no.</label>
            <strong>{identification_number}</strong>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="mb-2">
            <label className="form-label text-muted">Name of the worker:</label>
            <strong>{name.toUpperCase()}</strong>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="mb-2">
            <label className="form-label text-muted">
              Father's / Husband's name:
            </label>
            <strong>{father_husband_name.toUpperCase()}</strong>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="mb-2">
            <label className="form-label text-muted">Date of birth:</label>
            <strong>{dateFormat(dob)}</strong>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="mb-2">
            <label className="form-label text-muted">Gender:</label>
            <strong>{genderFormat(gender).toUpperCase()}</strong>
          </div>
        </div>
        <div className="col-sm-12 col-md-12">
          <div className="mb-2">
            <label className="form-label text-muted">Permanent address</label>
            <strong>{permanent_address.toUpperCase() || `NA`}</strong>
          </div>
        </div>
      </div>
      <div className="row row-cards mt-1">
        <div className="col-sm-6 col-md-6">
          <div className="mb-2">
            <label className="form-label text-muted">Mobile no.</label>
            <strong>{mobile}</strong>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="mb-2">
            <label className="form-label text-muted">
              Emergency contact no.
            </label>
            <strong>{emergency_contact_no || `NA`}</strong>
          </div>
        </div>
      </div>
      <div className="row row-cards mt-1">
        <div className="col-sm-6 col-md-6">
          <div className="mb-2">
            <label className="form-label text-muted">Khadyasathi no.</label>
            <strong>{khadyasathi_no || `NA`}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantBasicInfo;
