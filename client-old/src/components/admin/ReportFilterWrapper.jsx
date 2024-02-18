import React from "react";

const ReportFilterWrapper = ({ title, children }) => {
  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body p-1">
          {/* <h3 className="card-title bg-dark text-white p-2">{title}</h3> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReportFilterWrapper;
