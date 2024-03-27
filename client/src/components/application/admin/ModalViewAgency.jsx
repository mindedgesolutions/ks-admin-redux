import React from "react";
import { useSelector } from "react-redux";
import { engageTypes } from "../../../utils/data";

const ModalViewAgency = ({ activeTab }) => {
  const { deoAppDetails } = useSelector((store) => store.deo);

  const engagedAs = engageTypes
    .find((c) => c.value === deoAppDetails.engaged_as)
    ?.text?.toUpperCase();

  return (
    <div className={`tab-pane ${activeTab === "agency" ? "active show" : ""}`}>
      <div className="row row-cards m-0 p-0">
        <div className="mb-3 col-md-12 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Engaged as : </label>
          <label className="form-label m-0 p-0">{engagedAs}</label>
        </div>
        {deoAppDetails.engaged_as === "Agency" && (
          <>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Employer's name :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.employer_name?.toUpperCase() || `NA`}
              </label>
            </div>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Employer's address :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.employer_address?.toUpperCase() || `NA`}
              </label>
            </div>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Employer's mobile no. :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.employer_mobile?.toUpperCase() || `NA`}
              </label>
            </div>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Agent's / Others name :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.agency_name?.toUpperCase() || `NA`}
              </label>
            </div>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Agent's / Others address :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.agency_address?.toUpperCase() || `NA`}
              </label>
            </div>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Agent's/ Others mobile no. :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.agency_mobile?.toUpperCase() || `NA`}
              </label>
            </div>
          </>
        )}

        {deoAppDetails.engaged_as === "Without-agency" && (
          <>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Employer's name :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.employer_name?.toUpperCase() || `NA`}
              </label>
            </div>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Employer's address :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.employer_address?.toUpperCase() || `NA`}
              </label>
            </div>
            <div className="mb-3 col-md-6 m-0 p-0">
              <label className="datagrid-title m-0 p-0">
                Employer's mobile no. :{" "}
              </label>
              <label className="form-label m-0 p-0">
                {deoAppDetails?.employer_mobile?.toUpperCase() || `NA`}
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalViewAgency;
