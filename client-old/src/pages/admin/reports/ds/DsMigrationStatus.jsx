import React, { useEffect, useState } from "react";
import {
  DsApplicationStatusFilters,
  PageHeader,
  PageLoader,
  PageWrapper,
} from "../../../../components";
import { reportNames } from "../../../../utils/data";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import customFetch from "../../../../utils/customFetch";
import { nanoid } from "nanoid";

export const loader = async () => {
  try {
    const districts = await customFetch.get("/master/districts");
    return { districts };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const DsMigrationStatus = () => {
  document.title = `Duare Sarkar Migration Status Report | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;
  const [loader, setLoader] = useState(false);
  const reportName = reportNames[1].name;

  const { districts } = useLoaderData();
  const districtList = districts.data.data.rows || [];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const filterDist = searchParams.get("dist");
  const filterSubDiv = searchParams.get("subdiv");
  const filterBlock = searchParams.get("block");
  const filterWard = searchParams.get("ward");
  const filterStart = searchParams.get("start");
  const filterEnd = searchParams.get("end");
  const [reports, setReports] = useState([]);

  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ds/migration-status`;

  // Fetching data from API starts ------
  const getReports = async () => {
    if (filterDist) {
      try {
        setLoader(true);
        const { data } = await customFetch.get(
          "/reports/ds-migration-status-report",
          {
            params: {
              dist: filterDist,
              subdiv: filterSubDiv || "",
              block: filterBlock || "",
              ward: filterWard || "",
              startDate: filterStart,
              endDate: filterEnd,
            },
          }
        );
        setLoader(false);
        const results = data.data.rows;
        return setReports(results);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        return error;
      }
    }
  };
  // Fetching data from API ends ------

  useEffect(() => {
    getReports();
  }, [filterDist, filterSubDiv, filterBlock, filterWard]);

  // Row and Table totals start ------
  const totalMigrated = reports.reduce(
    (t, c) => Number(t) + Number(c.migcount),
    0
  );
  const totalLikelyMigrated = reports.reduce(
    (t, c) => Number(t) + Number(c.likelymigcount),
    0
  );
  let tableTotal = 0,
    tableTotalExcel = 0;

  let colSpan;
  switch (colSpan) {
    case filterDist:
      colSpan = 6;
      break;
    case filterSubDiv:
      colSpan = 6;
      break;
    case filterBlock:
      colSpan = 7;
      break;
    case filterWard:
      colSpan = 8;
      break;
    default:
      colSpan = 6;
      break;
  }

  let colTwo, colThree;
  if (filterWard) {
    colTwo = `BLOCK / MUNICIPALITY`;
    colThree = `VILLAGE / WARD`;
  }
  if (filterBlock) {
    colTwo = `BLOCK / MUNICIPALITY`;
    colThree = `VILLAGE / WARD`;
  }
  if (filterSubDiv && !filterBlock) {
    colTwo = `SUB-DIVISION`;
    colThree = `BLOCK / MUNICIPALITY`;
  }
  if (filterDist && !filterSubDiv) {
    colTwo = `DISTRICT`;
    colThree = `SUB-DIVISION`;
  }

  const handleExport = () => {};

  return (
    <>
      <PageHeader
        title="Duare Sarkar Migration Status Report"
        breadCrumb={breadCrumb}
      />
      <PageWrapper>
        <DsApplicationStatusFilters
          districts={districtList}
          reportName={reportName}
          resetUrl={resetUrl}
        />

        <div className="col-12">
          <div className="card">
            {!loader && filterDist && (
              <div className="card-header justify-content-end">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleExport}
                >
                  Export to excel
                </button>
              </div>
            )}

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-striped table-hover table-bordered card-table">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">{colTwo}</th>
                      <th className="bg-dark text-white">{colThree}</th>
                      <th className="bg-dark text-white">Migrated</th>
                      <th className="bg-dark text-white">Likely To Migrate</th>
                      <th className="bg-dark text-white">Total MWIN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loader ? (
                      <tr>
                        <td colSpan={colSpan}>
                          <PageLoader />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filterDist && reports.length > 0 ? (
                          <>
                            {reports.map((report, i) => {
                              const {
                                district_name,
                                subdiv_name,
                                block_mun_name,
                                village_ward_name,
                                migcount,
                                likelymigcount,
                              } = report;
                              const key = nanoid();
                              const rowTotal =
                                Number(migcount) + Number(likelymigcount);
                              tableTotal = tableTotal + Number(rowTotal);
                              return (
                                <tr key={key} className="fs-5">
                                  <td>{i + 1}.</td>
                                  {!filterSubDiv && (
                                    <td className="text-uppercase">
                                      {district_name}
                                    </td>
                                  )}
                                  {!filterBlock && (
                                    <td className="text-uppercase">
                                      {subdiv_name ? subdiv_name : "ALL"}
                                    </td>
                                  )}
                                  {filterSubDiv && (
                                    <td className="text-uppercase">
                                      {block_mun_name ? block_mun_name : ""}
                                    </td>
                                  )}
                                  {filterBlock && (
                                    <td className="text-uppercase">
                                      {village_ward_name
                                        ? village_ward_name
                                        : "W"}
                                    </td>
                                  )}
                                  <td className="text-uppercase">
                                    {migcount || 0}
                                  </td>
                                  <td className="text-uppercase">
                                    {likelymigcount || 0}
                                  </td>
                                  <td className="text-uppercase">{rowTotal}</td>
                                </tr>
                              );
                            })}
                            <tr>
                              <th
                                colSpan={colSpan - 3}
                                className="fs-5 text-center"
                              >
                                TOTAL COUNT
                              </th>
                              <th>{totalMigrated || 0}</th>
                              <th>{totalLikelyMigrated || 0}</th>
                              <th>{tableTotal || 0}</th>
                            </tr>
                          </>
                        ) : (
                          <tr className="fs-5">
                            <td
                              className="text-uppercase text-center"
                              colSpan={colSpan}
                            >
                              NO DATA FOUND
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DsMigrationStatus;
