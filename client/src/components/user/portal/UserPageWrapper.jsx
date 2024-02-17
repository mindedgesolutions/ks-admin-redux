import React from "react";

const UserPageWrapper = ({ children }) => {
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

export default UserPageWrapper;
