import React from "react";
import { useSelector } from "react-redux";

const ModalViewWorksite = ({ activeTab }) => {
  const { deoAppDetails } = useSelector((store) => store.deo);

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

export default ModalViewWorksite;
