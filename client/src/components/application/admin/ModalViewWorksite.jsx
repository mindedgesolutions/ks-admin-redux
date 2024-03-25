import React from "react";
import { useSelector } from "react-redux";
import { dateFormat } from "../../../utils/functions";

const ModalViewWorksite = ({ activeTab }) => {
  const { deoAppDetails, countries, states, jobs } = useSelector(
    (store) => store.deo
  );

  const country = countries
    .find((c) => c.id === Number(deoAppDetails.present_country))
    ?.country_name?.toUpperCase();
  const appState = states
    .find((c) => c.id === deoAppDetails?.present_state)
    ?.statename?.toUpperCase();
  const job = jobs
    .find((c) => c.id === deoAppDetails?.nature_of_work_id)
    ?.nature_of_work?.toUpperCase();

  return (
    <div
      className={`tab-pane ${activeTab === "worksite" ? "active show" : ""}`}
    >
      <div className="row row-cards m-0 p-0">
        <div className="mb-3 col-md-12 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Worksite address : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.present_address?.toUpperCase()}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Country : </label>
          <label className="form-label m-0 p-0">{country}</label>
        </div>
        {deoAppDetails.present_country === 1 ? (
          <div className="mb-3 col-md-6 m-0 p-0">
            <label className="datagrid-title m-0 p-0">State : </label>
            <label className="form-label m-0 p-0">{appState}</label>
          </div>
        ) : (
          <div className="mb-3 col-md-6 m-0 p-0">
            <label className="datagrid-title m-0 p-0">Passport no. : </label>
            <label className="form-label m-0 p-0">
              {deoAppDetails?.passport_no || `NA`}
            </label>
          </div>
        )}

        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Worksite police station :{" "}
          </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.present_ps?.toUpperCase() || `NA`}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Nature of employment :{" "}
          </label>
          <label className="form-label m-0 p-0">{job}</label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Migrated on : </label>
          <label className="form-label m-0 p-0">
            {dateFormat(deoAppDetails?.migrated_from_date)}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Expected wages per day :
          </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.expected_salary || 0}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalViewWorksite;
