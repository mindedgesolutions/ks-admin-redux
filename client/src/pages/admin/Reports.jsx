import React, { useEffect, useState } from "react";
import { PageHeader, PageWrapper, ReportItems } from "../../components";
import { Link } from "react-router-dom";
import { reports } from "../../utils/data";
import { nanoid } from "nanoid";

const Reports = () => {
  document.title = `Karmasathi Reports | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const [activeReport, setActiveReport] = useState({
    id: reports[0].id,
    title: reports[0].title,
  });

  const stored = localStorage.getItem("report");

  const handleReportState = (id, title) => {
    setActiveReport({ id: id, title: title });
    localStorage.setItem("report", [id, title]);
  };

  return (
    <>
      <PageHeader title="Karmasathi Reports" />
      <PageWrapper>
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
                        className={`list-group-item list-group-item-action d-flex align-items-center ${
                          id === activeReport.id ? "active" : ""
                        }`}
                        onClick={() => handleReportState(id, title)}
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
                <h2 className="mb-4">{activeReport.title}</h2>

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
      </PageWrapper>
    </>
  );
};

export default Reports;
