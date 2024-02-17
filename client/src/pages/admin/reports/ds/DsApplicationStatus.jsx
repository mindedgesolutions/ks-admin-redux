import React, { useEffect, useState } from "react";
import {
  DsApplicationStatusFilters,
  PageHeader,
  PageLoader,
  PageWrapper,
} from "../../../../components";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { reportNames } from "../../../../utils/data";
import {
  handleFooterStyling,
  handleHeaderStyling,
} from "../../../../utils/excelStying";

export const loader = async () => {
  try {
    const districts = await customFetch.get("/master/districts");
    return { districts };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const DsApplicationStatus = () => {
  document.title = `Duare Sarkar Application Status Report | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;
  const [loader, setLoader] = useState(false);
  const reportName = reportNames[0].name;

  const { districts, params } = useLoaderData();
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

  let colSpan;
  switch (colSpan) {
    case filterDist:
      colSpan = 9;
      break;
    case filterSubDiv:
      colSpan = 9;
      break;
    case filterBlock:
      colSpan = 10;
      break;
    case filterWard:
      colSpan = 11;
      break;
    default:
      colSpan = 9;
      break;
  }

  // Fetching data from API starts ------
  const getReports = async () => {
    if (filterDist) {
      try {
        setLoader(true);
        const { data } = await customFetch.get(
          "/reports/ds-application-status-report",
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

  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ds/application-status`;

  // Row and Table totals start ------
  const totalProvisional = reports.reduce(
    (t, c) => Number(t) + Number(c.provisional),
    0
  );
  const totalDocUploaded = reports.reduce(
    (t, c) => Number(t) + Number(c.docuploaded),
    0
  );
  const totalSubmitted = reports.reduce(
    (t, c) => Number(t) + Number(c.submitted),
    0
  );
  const totalRejected = reports.reduce(
    (t, c) => Number(t) + Number(c.rejected),
    0
  );
  const totalCount = reports.reduce((t, c) => Number(t) + Number(c.count), 0);
  let tableTotal = 0,
    tableTotalExcel = 0;
  // Row and Table totals end ------

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

  // Export data to excel starts ------
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("ds-application-status-report");

    sheet.columns = [
      { header: "SL. NO.", key: "id", width: 10 },
      { header: colTwo, key: "parentName", width: 25 },
      { header: colThree, key: "childName", width: 25 },
      { header: "PROVISIONAL MWIN", key: "provisional", width: 22 },
      { header: "DOC. UPLOADED", key: "docuploaded", width: 22 },
      { header: "UNDER PROCESS", key: "underprocess", width: 22 },
      { header: "REJECTED", key: "rejected", width: 22 },
      { header: "PERMANENT MWIN", key: "submitted", width: 22 },
      { header: "TOTAL MWIN", key: "rowTotal", width: 22 },
    ];

    reports.map((report, index) => {
      const slno = index + 1;

      let parentValue, childValue;
      if (filterBlock) {
        parentValue = report.block_mun_name;
        childValue = report.village_ward_name;
      }
      if (filterSubDiv && !filterBlock) {
        parentValue = report.subdiv_name || `ALL`;
        childValue = report.block_mun_name;
      }
      if (filterDist && !filterSubDiv) {
        parentValue = report.district_name;
        childValue = report.subdiv_name || `ALL`;
      }
      const totalInRow =
        Number(report.provisional) +
        Number(report.docuploaded) +
        0 +
        Number(report.rejected) +
        Number(report.submitted);

      sheet.addRow({
        id: slno,
        parentName: parentValue,
        childName: childValue,
        provisional: Number(report.provisional) || 0,
        docuploaded: Number(report.docuploaded) || 0,
        underprocess: 0,
        rejected: Number(report.rejected) || 0,
        submitted: Number(report.submitted) || 0,
        rowTotal: totalInRow,
      });
      tableTotalExcel = tableTotalExcel + Number(totalInRow);
    });

    // Styling the excel starts ------
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center" };
      });
    });
    const lastRow = reports.length + 2;

    sheet.mergeCells(`A${lastRow}:C${lastRow}`);
    sheet.getCell(`A${lastRow}`).value = "TOTAL";
    sheet.getCell(`A${lastRow}`).alignment = { horizontal: "center" };

    sheet.getCell(`D${lastRow}`).value = totalProvisional;
    sheet.getCell(`D${lastRow}`).alignment = { horizontal: "center" };

    sheet.getCell(`E${lastRow}`).value = totalDocUploaded;
    sheet.getCell(`E${lastRow}`).alignment = { horizontal: "center" };

    sheet.getCell(`F${lastRow}`).value = 0;
    sheet.getCell(`F${lastRow}`).alignment = { horizontal: "center" };

    sheet.getCell(`G${lastRow}`).value = totalRejected;
    sheet.getCell(`G${lastRow}`).alignment = { horizontal: "center" };

    sheet.getCell(`H${lastRow}`).value = totalSubmitted;
    sheet.getCell(`H${lastRow}`).alignment = { horizontal: "center" };

    sheet.getCell(`I${lastRow}`).value = tableTotalExcel;
    sheet.getCell(`I${lastRow}`).alignment = { horizontal: "center" };

    handleHeaderStyling(sheet, [
      "A1",
      "B1",
      "C1",
      "D1",
      "E1",
      "F1",
      "G1",
      "H1",
      "I1",
    ]);

    handleFooterStyling(sheet, [
      `A${lastRow}`,
      `B${lastRow}`,
      `C${lastRow}`,
      `D${lastRow}`,
      `E${lastRow}`,
      `F${lastRow}`,
      `G${lastRow}`,
      `H${lastRow}`,
      `I${lastRow}`,
    ]);

    sheet.getRow(1).font = { color: { argb: "fffffaf0" } };
    sheet.getRow(lastRow).font = { color: { argb: "fffffaf0" } };
    // Styling the excel ends ------

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `Duare Sarkar Application Status Report - ${new Date()}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  // Export data to excel ends ------

  return (
    <>
      <PageHeader
        title="Duare Sarkar Application Status Report"
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
                <table
                  name="reportData"
                  id="reportData"
                  className="table table-vcenter text-nowrap datatable table-striped table-hover table-bordered card-table"
                >
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">{colTwo}</th>
                      <th className="bg-dark text-white">{colThree}</th>
                      <th className="bg-dark text-white">Provisional MWIN</th>
                      <th className="bg-dark text-white">Doc. Uploaded</th>
                      <th className="bg-dark text-white">Under Process *</th>
                      <th className="bg-dark text-white">Rejected</th>
                      <th className="bg-dark text-white">Permanent MWIN</th>
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
                                docuploaded,
                                provisional,
                                submitted,
                                rejected,
                                count,
                              } = report;
                              const key = nanoid();
                              const rowTotal =
                                Number(docuploaded) +
                                Number(provisional) +
                                Number(submitted);
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
                                    {provisional}
                                  </td>
                                  <td className="text-uppercase">
                                    {docuploaded}
                                  </td>
                                  <td className="text-uppercase">
                                    {count || 0}
                                  </td>
                                  <td className="text-uppercase">
                                    {rejected || 0}
                                  </td>
                                  <td className="text-uppercase">
                                    {submitted || 0}
                                  </td>
                                  <td className="text-uppercase">{rowTotal}</td>
                                </tr>
                              );
                            })}
                            <tr>
                              <th
                                colSpan={colSpan - 6}
                                className="fs-5 text-center"
                              >
                                TOTAL COUNT
                              </th>
                              <th>{totalProvisional}</th>
                              <th>{totalDocUploaded}</th>
                              <th>{totalCount || 0}</th>
                              <th>{totalRejected || 0}</th>
                              <th>{totalSubmitted}</th>
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

export default DsApplicationStatus;
