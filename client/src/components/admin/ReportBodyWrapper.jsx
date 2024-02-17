import React from "react";

const ReportBodyWrapper = ({ children }) => {
  return (
    <div className="col-lg-8">
      <div className="card">
        <div className="table-responsive">{children}</div>
      </div>
    </div>
  );
};

export default ReportBodyWrapper;
