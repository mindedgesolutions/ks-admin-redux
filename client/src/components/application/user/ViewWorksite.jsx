import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { dateFormat } from "../../../utils/functions";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewWorksite = () => {
  const { work, agency } = useLoaderData();
  const { currentTab } = useSelector((store) => store.overview);
  const { states } = useSelector((store) => store.states);
  const { jobs } = useSelector((store) => store.jobs);

  const state = states.find(
    (i) => i.id === work?.data?.data?.rows[0]?.present_state
  );
  const job = jobs.find(
    (i) => i.id === work?.data?.data?.rows[0]?.nature_of_work_id
  );

  return (
    <div
      className={`tab-pane ${currentTab === "worksite" ? "active show" : ""}`}
    >
      <div className="row row-cards">
        <div className="col-md-8 col-sm-12">
          <label className="datagrid-title">Worksite address :</label>
          <label className="form-label">
            {work.data.data.rows[0].present_address.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <Link
            to="/user/worksite-info"
            className="btn btn-yellow btn-sm px-2 py-1 float-end"
          >
            <MdEdit className="me-1" /> Edit
          </Link>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Country :</label>
          <label className="form-label">
            {work.data.data.rows[0].present_country_name.toUpperCase()}
          </label>
        </div>
        {work.data.data.rows[0].present_country === 1 ? (
          <div className="col-md-8 col-sm-12">
            <label className="datagrid-title">State :</label>
            <label className="form-label">
              {state?.statename?.toUpperCase()}
            </label>
          </div>
        ) : (
          <div className="col-md-8 col-sm-12">
            <label className="datagrid-title">Passport no. :</label>
            <label className="form-label">
              {work?.data?.data?.rows[0]?.passport_no || "NA"}
            </label>
          </div>
        )}
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Worksite police station :</label>
          <label className="form-label">
            {work?.data?.data?.rows[0]?.present_ps?.toUpperCase()}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Nature of employment :</label>
          <label className="form-label">
            {job?.nature_of_work?.toUpperCase()}
          </label>
        </div>
      </div>
      <div className="row row-cards">
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Migrated on :</label>
          <label className="form-label">
            {dateFormat(work?.data?.data?.rows[0]?.migrated_from_date)}
          </label>
        </div>
        <div className="col-md-4 col-sm-12">
          <label className="datagrid-title">Expected wages per day :</label>
          <label className="form-label">
            {work?.data?.data?.rows[0]?.expected_salary}
          </label>
        </div>
      </div>

      <hr className="my-3" />

      <div className="row row-cards">
        <div className="col-md-6 col-sm-12">
          <label className="datagrid-title">Engaged as :</label>
          <label className="form-label">
            {agency?.data?.data?.rows[0]?.engaged_as?.toUpperCase()}
          </label>
        </div>
      </div>
      {agency?.data?.data?.rows[0]?.engaged_as === "Agency" && (
        <>
          <div className="row row-cards">
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">Employer's name :</label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.employer_name?.toUpperCase()}
              </label>
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">Employer's address :</label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.employer_address?.toUpperCase()}
              </label>
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">Employer's mobile no. :</label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.employer_mobile?.toUpperCase()}
              </label>
            </div>
          </div>
          <div className="row row-cards">
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">Agent's / Others name :</label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.agency_name?.toUpperCase()}
              </label>
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">
                Agent's / Others address :
              </label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.agency_address?.toUpperCase()}
              </label>
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">
                Agent's/ Others mobile no. :
              </label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.agency_mobile?.toUpperCase()}
              </label>
            </div>
          </div>
        </>
      )}

      {agency?.data?.data?.rows[0]?.engaged_as === "Without-agency" && (
        <>
          <div className="row row-cards">
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">Employer's name :</label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.employer_name?.toUpperCase()}
              </label>
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">Employer's address :</label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.employer_address?.toUpperCase()}
              </label>
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="datagrid-title">Employer's mobile no. :</label>
              <label className="form-label">
                {agency?.data?.data?.rows[0]?.employer_mobile?.toUpperCase()}
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewWorksite;
