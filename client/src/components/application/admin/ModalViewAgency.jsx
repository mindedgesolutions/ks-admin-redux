import React from "react";

const ModalViewAgency = ({ activeTab }) => {
  return (
    <div className={`tab-pane ${activeTab === "agency" ? "active show" : ""}`}>
      <div className="row row-cards mt-1">
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Email : </label>
          <label className="form-label m-0 p-0">Details</label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Email : </label>
          <label className="form-label m-0 p-0">Details</label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Email : </label>
          <label className="form-label m-0 p-0">Details</label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Email : </label>
          <label className="form-label m-0 p-0">Details</label>
        </div>
      </div>
    </div>
  );
};

export default ModalViewAgency;
