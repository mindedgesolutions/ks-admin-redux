import React from "react";
import { useSelector } from "react-redux";

const ModalViewBank = ({ activeTab }) => {
  const { deoAppDetails } = useSelector((store) => store.deo);

  return (
    <div className={`tab-pane ${activeTab === "bank" ? "active show" : ""}`}>
      <div className="row row-cards mt-1">
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">IFSC code : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.ifsc_code}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Bank name : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.bank_name?.toUpperCase()}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Branch name : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.bank_branch?.toUpperCase()}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Account no. : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.bank_account}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Ration Card / Khadya Sathi Card no. :{" "}
          </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.khadyasathi_no}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Sasthya Sathi Card no. :{" "}
          </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.sasthyasathi_no || `NA`}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalViewBank;
