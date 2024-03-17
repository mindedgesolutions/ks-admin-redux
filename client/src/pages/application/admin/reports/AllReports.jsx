import React, { useState } from "react";
import {
  ReportItems,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { reports } from "../../../../utils/data";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { setReport } from "../../../../features/reports/reportSlice";

const AllReports = () => {
  document.title = `Karmasathi Reports | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const dispatch = useDispatch();
  const { id, title } = useSelector((store) => store.reports);

  const [activeReport, setActiveReport] = useState({
    id: id || 1,
    title: title || "Duare Sarkar Reports",
  });

  const handleChange = (e) => {
    setActiveReport({ id: e.id, title: e.title });
    dispatch(setReport({ id: e.id, title: e.title }));
  };

  return (
    <>
      <UserPageHeader title="Karmasathi Reports" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <div className="col-3 d-none d-md-block border-end">
              <div className="card-body">
                <h4 className="subheader">All reports</h4>
                <div className="list-group list-group-transparent">
                  {reports.map((report) => {
                    const { id, title } = report;
                    const key = nanoid();
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex align-items-center px-3 ${
                          id === activeReport.id ? "active" : ""
                        }`}
                        onClick={(e) => handleChange({ id: id, title: title })}
                      >
                        {title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col d-flex flex-column">
              <div className="card-body">
                <h2 className="mb-2">{activeReport.title}</h2>

                <div className="card-body">
                  <div className="divide-y">
                    {reports.map((report) => {
                      if (activeReport.id === report.id) {
                        const id = nanoid();
                        return <ReportItems key={id} report={report} />;
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default AllReports;
