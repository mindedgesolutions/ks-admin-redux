import React, { useEffect, useState } from "react";
import {
  ExportBtnGroup,
  FilterBlockDate,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import customFetch from "../../../../../utils/customFetch";
import { splitErrors } from "../../../../../utils/showErrors";
import { setReportData } from "../../../../../features/reports/reportSlice";
import { nanoid } from "nanoid";
import { FaRegFolder } from "react-icons/fa6";

const KsOrigination = () => {
  document.title = `Application Origination Report | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;

  // Report based static data starts ------
  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ks/origination`;
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
  const fetchData = async () => {
    if (queryParams.get("dist")) {
      setIsLoading(true);
      try {
        const response = await customFetch.get(`/reports/ks-origination`, {
          params: {
            dist: queryParams.get("dist"),
            subdiv: queryParams.get("subdiv"),
            block: queryParams.get("block"),
          },
        });
        setIsLoading(false);
        dispatch(setReportData(response.data.data.rows));
        setResult(response.data.data.rows);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        setIsLoading(false);
        return error;
      }
    }
  };
  // Fetch report data ends ------

  // Row and Table totals start ------
  const totalWeb = result.reduce((t, c) => Number(t) + Number(c.totalweb), 0);
  const totalApp = result.reduce((t, c) => Number(t) + Number(c.totalapp), 0);
  const totalDs = result.reduce((t, c) => Number(t) + Number(c.totalds), 0);
  const totalSd = result.reduce((t, c) => Number(t) + Number(c.totalsd), 0);
  const totalBsk = result.reduce((t, c) => Number(t) + Number(c.totalbsk), 0);
  // Row and Table totals end ------

  useEffect(() => {
    fetchData();
  }, [
    queryParams.get("dist"),
    queryParams.get("subdiv"),
    queryParams.get("btype"),
    queryParams.get("block"),
  ]);

  return (
    <>
      <UserPageHeader
        title={`Application Origination Report`}
        breadCrumb={breadCrumb}
      />
      <UserPageWrapper>
        <FilterBlockDate resetUrl={resetUrl} setResult={setResult} />

        <div className="col-12">
          <div className="card">
            {result.length > 0 && <ExportBtnGroup />}

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">{colTwo}</th>
                      <th className="bg-dark text-white">{colThree}</th>
                      <th className="bg-dark text-white">Website</th>
                      <th className="bg-dark text-white">App</th>
                      <th className="bg-dark text-white">Duare Sarkar</th>
                      <th className="bg-dark text-white">Special Drive</th>
                      <th className="bg-dark text-white">BSK</th>
                      <th className="bg-dark text-white"></th>
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
                                <td>{row.totalweb || 0}</td>
                                <td>{row.totalapp}</td>
                                <td>{row.totalds}</td>
                                <td>{row.totalsd}</td>
                                <td>{row.totalbsk}</td>
                                <td>
                                  <FaRegFolder
                                    title="View"
                                    className="me-2 fs-3 text-yellow cursor-pointer"
                                    size={16}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        {result.length > 0 ? (
                          <tr>
                            <th className="bg-dark text-white" colSpan={3}>
                              TOTAL
                            </th>
                            <th className="bg-dark text-white">{totalWeb}</th>
                            <th className="bg-dark text-white">{totalApp}</th>
                            <th className="bg-dark text-white">{totalDs}</th>
                            <th className="bg-dark text-white">{totalSd}</th>
                            <th className="bg-dark text-white">{totalBsk}</th>
                            <th className="bg-dark text-white"></th>
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

export default KsOrigination;
