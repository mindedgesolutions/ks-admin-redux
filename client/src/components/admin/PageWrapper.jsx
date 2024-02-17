import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="col-12">
          <div className="row row-cards">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
