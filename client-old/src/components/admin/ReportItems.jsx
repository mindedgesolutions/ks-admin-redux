import { nanoid } from "nanoid";
import React from "react";
import { Link } from "react-router-dom";

const ReportItems = ({ report }) => {
  const { children } = report;

  return children.map((child) => {
    const { title, description, url } = child;
    const id = nanoid();
    const titleArray = title.split(" ");
    const nameInitials = titleArray[0].charAt(0) + titleArray[1].charAt(0);

    return (
      <div key={id}>
        <div className="row">
          <div className="col-auto">
            <span className="avatar">{nameInitials}</span>
          </div>
          <div className="col" title={title}>
            <Link to={url} className="fw-bold tt-uppercase text-uppercase">
              {title}
            </Link>
            <div className="text-truncate">{description}</div>
          </div>
        </div>
      </div>
    );
  });
};

export default ReportItems;
