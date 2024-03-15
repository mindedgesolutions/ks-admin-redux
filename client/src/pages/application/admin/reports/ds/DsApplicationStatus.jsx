import React, { useEffect, useState } from "react";
import {
  FilterBlockDate,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import { Link, useLocation, useParams } from "react-router-dom";
import customFetch from "../../../../../utils/customFetch";
import { splitErrors } from "../../../../../utils/showErrors";
import { nanoid } from "nanoid";

const DsApplicationStatus = () => {
  const { id } = useParams();
  const idLabel = id === 7 ? "VII" : "VIII";
  document.title = `Duare Sarkar ${idLabel} Application Status Report | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;
  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ds/application-status/${id}`;

  const startDate = new Date("09-01-2023");
  const endDate = new Date("10-17-2023");

  const { search } = useLocation();
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
        setResult(response.data.data.rows);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        return error;
      }
    }
  };
  console.log(result);
  // Fetch report data ends ------

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
        />

        <div className="col-12">
          <div className="card">
            <div className="card-header justify-content-end">
              <button type="button" className="btn btn-success">
                Export
              </button>
            </div>

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
                        {result.map((row, index) => {
                          const rowTotal =
                            Number(row.provisional) +
                            Number(row.docuploaded) +
                            Number(row.underprocess) +
                            Number(row.rejected) +
                            Number(row.permanent);
                          return (
                            <tr key={nanoid()}>
                              <td>{index + 1}.</td>
                              <td>{row.district_name}</td>
                              <td>{row.subdiv_name}</td>
                              <td>{row.provisional || 0}</td>
                              <td>{row.docuploaded || 0}</td>
                              <td>{row.underprocess || 0}</td>
                              <td>{row.rejected || 0}</td>
                              <td>{row.permanent || 0}</td>
                              <td>{rowTotal}</td>
                            </tr>
                          );
                        })}
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
