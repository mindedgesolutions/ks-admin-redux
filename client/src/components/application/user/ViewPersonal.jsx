import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { dateFormat, genderFormat } from "../../../utils/functions";
import { qualificationList } from "../../../utils/data";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewPersonal = () => {
  const { info } = useLoaderData();
  const { currentTab } = useSelector((store) => store.overview);

  const qualificationLabel = qualificationList.find(
    (i) => i.value === info?.data?.data?.response?.rows[0]?.qualification
  );

  return (
    <div
      className={`tab-pane ${currentTab === "personal" ? "active show" : ""}`}
    >
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Name :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.name.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Father's / Husband's name :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.father_husband_name.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <Link
            to="/user/personal-info"
            className="btn btn-yellow btn-sm px-2 py-1 float-end"
          >
            <MdEdit className="me-1" /> Edit
          </Link>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Gender :</label>
          <label className="form-label">
            {genderFormat(
              info?.data?.data?.response?.rows[0]?.gender
            )?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Date of birth :</label>
          <label className="form-label">
            {dateFormat(info?.data?.data?.response?.rows[0]?.dob)} (
            {info?.data?.data?.response?.rows[0]?.age})
          </label>
        </div>
      </div>

      <hr className="my-3" />

      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Category :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.caste?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Religion :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.religion
              ? info?.data?.data?.religionName?.toUpperCase()
              : info?.data?.data?.response?.rows[0]?.religion_other?.toUpperCase()}
          </label>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">
            Emergency mobile number of family member :
          </label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.emergency_contact_no}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Aadhaar number :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.aadhar_no}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">EPIC number :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.epic_no || "NA"}
          </label>
        </div>
      </div>

      <hr className="my-3" />

      <div className="row row-cards">
        <div className="col-md-6 col-sm-12">
          <label className="datagrid-title">Permanent address :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.permanent_address?.toUpperCase()}
          </label>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">District :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.district_name?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Sub-division :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.subdiv_name?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Block :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.block_mun_name?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Gram Panchayat :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.village_ward_name?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Police station :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.ps_name?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">PIN :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.permanent_pin}
          </label>
        </div>
      </div>

      <hr className="my-3" />

      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Qualification :</label>
          <label className="form-label">
            {qualificationLabel?.text?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-8 col-sm-12">
          <label className="datagrid-title">Technical skills :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.technical_skill?.toUpperCase() ||
              "NA"}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ViewPersonal;
