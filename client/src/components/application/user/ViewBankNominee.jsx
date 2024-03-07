import { nanoid } from "nanoid";
import React from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { randomBadgeBg } from "../../../utils/functions";

const ViewBankNominee = () => {
  const { currentTab } = useSelector((store) => store.overview);
  const { info, bank, userSchemes } = useLoaderData();

  return (
    <div className={`tab-pane ${currentTab === "bank" ? "active show" : ""}`}>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">IFSC code :</label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.ifsc_code}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Bank name :</label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.bank_name?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <Link
            to="/user/bank-nominee-info"
            className="btn btn-yellow btn-sm px-2 py-1 float-end"
          >
            <MdEdit className="me-1" /> Edit
          </Link>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Branch name :</label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.bank_branch?.toUpperCase()}
          </label>
        </div>

        <div className="col-md-8 col-sm-12">
          <label className="datagrid-title">Account no. :</label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.bank_account}
          </label>
        </div>
      </div>

      <hr className="my-3" />

      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">
            Ration Card / Khadya Sathi Card no. :
          </label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.khadyasathi_no}
          </label>
        </div>
        <div className="col-md-8 col-sm-12">
          <label className="datagrid-title">Sasthya Sathi Card no. :</label>
          <label className="form-label">
            {info?.data?.data?.response?.rows[0]?.sasthyasathi_no}
          </label>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-12 col-sm-12">
          <label className="datagrid-title">Availed schemes :</label>
          <label className="form-label">
            {userSchemes.data.data.rows.map((i) => {
              return (
                <span
                  key={nanoid()}
                  className={`badge bg-${randomBadgeBg()}-lt p-2 me-2 my-1`}
                >
                  {i?.schemes_name?.toUpperCase()}
                </span>
              );
            })}
          </label>
        </div>
      </div>

      <hr className="my-3" />

      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Nominee name :</label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.nominee_name?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">
            Relationship with the nominee :
          </label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.nominee_relationship?.toUpperCase()}
          </label>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Nominee mobile no. :</label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.nominee_mobile}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Nominee Aadhaar no. :</label>
          <label className="form-label">
            {bank?.data?.data?.rows[0]?.nominee_aadhar}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ViewBankNominee;
