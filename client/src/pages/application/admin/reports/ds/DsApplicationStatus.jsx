import React, { useEffect, useState } from "react";
import {
  ExportBtnGroup,
  FilterBlockDate,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import { Link, useLocation, useParams } from "react-router-dom";
import customFetch from "../../../../../utils/customFetch";
import { splitErrors } from "../../../../../utils/showErrors";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { setReportData } from "../../../../../features/reports/reportSlice";

const DsApplicationStatus = () => {
  const { id } = useParams();
  const idLabel = Number(id) === 7 ? "VII" : "VIII";
  document.title = `Duare Sarkar ${idLabel} Application Status Report | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;

  // Report based static data starts ------
  const startDate = new Date("09-01-2023");
  const endDate = new Date("10-17-2023");
  const allDataApi = `/reports/ds-application-status-all`;
  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ds/application-status/${id}`;
  // Report based static data ends ------

  const { search } = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  // Set column labels start ------
  let colTwo = `DISTRICT`,
    colThree = `SUB-DIVISION`;

  if (queryParams.get("dist") && !queryParams.get("subdiv")) {
    colTwo = `DISTRICT`;
    colThree = `SUB-DIVISION`;
  }
  if (queryParams.get("subdiv") && !queryParams.get("block")) {
    colTwo = `SUB-DIVISION`;
    colThree = `BLOCK / MUNICIPALITY`;
  }
  if (queryParams.get("block")) {
    colTwo = `BLOCK / MUNICIPALITY`;
    colThree = `VILLAGE / WARD`;
  }
  // Set column labels end ------

  // Fetch report data starts ------
  const fetchReport = async () => {
    if (queryParams.get("dist")) {
      setIsLoading(true);
      try {
        const response = await customFetch.get(
          `/reports/ds-application-status`,
          {
            params: {
              dist: queryParams.get("dist"),
              subdiv: queryParams.get("subdiv") || "",
              block: queryParams.get("block") || "",
              startDate: queryParams.get("start"),
              endDate: queryParams.get("end"),
            },
          }
        );
        setIsLoading(false);
        dispatch(setReportData(response.data.data.rows));
        setResult(response.data.data.rows);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        return error;
      }
    }
  };
  // Fetch report data ends ------

  // Row and Table totals start ------
  const totalProvisional = result.reduce(
    (t, c) => Number(t) + Number(c.provisional),
    0
  );
  const totalDocUploaded = result.reduce(
    (t, c) => Number(t) + Number(c.docuploaded),
    0
  );
  const totalUnderProcess = result.reduce(
    (t, c) => Number(t) + Number(c.underprocess),
    0
  );
  const totalRejected = result.reduce(
    (t, c) => Number(t) + Number(c.rejected),
    0
  );
  const totalPermanent = result.reduce(
    (t, c) => Number(t) + Number(c.permanent),
    0
  );
  const totalCount =
    Number(totalProvisional) +
    Number(totalDocUploaded) +
    Number(totalUnderProcess) +
    Number(totalRejected) +
    Number(totalPermanent);
  // Row and Table totals end ------

  useEffect(() => {
    fetchReport();
  }, [
    queryParams.get("dist"),
    queryParams.get("subdiv"),
    queryParams.get("btype"),
    queryParams.get("block"),
    queryParams.get("start"),
    queryParams.get("end"),
  ]);

  return (
    <>
      <UserPageHeader
        title={`Duare Sarkar ${idLabel} Application Status Report`}
        breadCrumb={breadCrumb}
      />
      <UserPageWrapper>
        <FilterBlockDate
          resetUrl={resetUrl}
          startDate={startDate}
          endDate={endDate}
          setResult={setResult}
        />

        <div className="col-12">
          <div className="card">
            <ExportBtnGroup
              startDate="09-01-2023"
              endDate="17-10-2023"
              allDataApi={allDataApi}
            />

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
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
                    {isLoading ? (
                      <tr>
                        <td colSpan={9}>
                          <ReportTableLoader />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {result &&
                          result.map((row, index) => {
                            const rowTotal =
                              Number(row.provisional) +
                              Number(row.docuploaded) +
                              Number(row.underprocess) +
                              Number(row.rejected) +
                              Number(row.permanent);

                            // Set column 2 and 3 values start ------
                            let colTwoLabel, colThreeLabel;
                            if (
                              queryParams.get("dist") ===
                              import.meta.env.VITE_ALL_DISTRICTS
                            ) {
                              colTwoLabel = row?.district_name?.toUpperCase();
                              colThreeLabel = `ALL`;
                            } else if (
                              queryParams.get("dist") &&
                              !queryParams.get("subdiv")
                            ) {
                              colTwoLabel = row?.district_name?.toUpperCase();
                              colThreeLabel = row?.subdiv_name
                                ?.trim()
                                ?.toUpperCase();
                            } else if (
                              queryParams.get("subdiv") &&
                              !queryParams.get("block")
                            ) {
                              colTwoLabel = row?.subdiv_name
                                ?.trim()
                                ?.toUpperCase();
                              colThreeLabel = row?.block_mun_name
                                ?.trim()
                                ?.toUpperCase();
                            } else if (queryParams.get("block")) {
                              colTwoLabel = row?.block_mun_name
                                ?.trim()
                                ?.toUpperCase();
                              colThreeLabel = row?.village_ward_name
                                ?.trim()
                                ?.toUpperCase();
                            }
                            // Set column 2 and 3 values end ------

                            return (
                              <tr key={nanoid()}>
                                <td>{index + 1}.</td>
                                <td>{colTwoLabel}</td>
                                <td>{colThreeLabel}</td>
                                <td>{row.provisional || 0}</td>
                                <td>{row.docuploaded || 0}</td>
                                <td>{row.underprocess || 0}</td>
                                <td>{row.rejected || 0}</td>
                                <td>{row.permanent || 0}</td>
                                <td>{rowTotal}</td>
                              </tr>
                            );
                          })}
                        {result.length > 0 ? (
                          <tr>
                            <th className="bg-dark text-white" colSpan={3}>
                              TOTAL
                            </th>
                            <th className="bg-dark text-white">
                              {totalProvisional}
                            </th>
                            <th className="bg-dark text-white">
                              {totalDocUploaded}
                            </th>
                            <th className="bg-dark text-white">
                              {totalUnderProcess}
                            </th>
                            <th className="bg-dark text-white">
                              {totalRejected}
                            </th>
                            <th className="bg-dark text-white">
                              {totalPermanent}
                            </th>
                            <th className="bg-dark text-white">{totalCount}</th>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan={9} className="text-center">
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
      </UserPageWrapper>
    </>
  );
};

export default DsApplicationStatus;
