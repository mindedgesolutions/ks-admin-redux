import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ExportBtnGroup,
  FilterBlockDate,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import { splitErrors } from "../../../../../utils/showErrors";
import customFetch from "../../../../../utils/customFetch";
import { setReportData } from "../../../../../features/reports/reportSlice";
import { nanoid } from "nanoid";

const DsStaticAtFive = () => {
  const { id } = useParams();
  const idLabel = Number(id) === 7 ? "VII" : "VIII";
  document.title = `Duare Sarkar ${idLabel} Cumulative Report till 5:00pm 17/03/2024 | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;

  // Report based static data starts ------
  const allDataApi = `/reports/ds-static-all`;
  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ds/static/${id}`;
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

  const fetchReport = async () => {
    if (queryParams.get("dist")) {
      setIsLoading(true);
      try {
        const response = await customFetch.get(`/reports/ds-static`, {
          params: {
            dist: queryParams.get("dist"),
            subdiv: queryParams.get("subdiv") || "",
            block: queryParams.get("block") || "",
            version: id,
          },
        });
        dispatch(setReportData(response.data.data.rows));
        setResult(response.data.data.rows);
        setIsLoading(false);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        setIsLoading(false);
        return error;
      }
    }
  };

  // Row and Table totals start ------
  const totalDelivered = result.reduce(
    (t, c) => Number(t) + Number(c.delivered),
    0
  );
  // Row and Table totals end ------

  useEffect(() => {
    fetchReport();
  }, [
    queryParams.get("dist"),
    queryParams.get("subdiv"),
    queryParams.get("btype"),
    queryParams.get("block"),
  ]);

  return (
    <>
      <UserPageHeader
        title={`Duare Sarkar ${idLabel} Static Cumulative Report till 5:00pm 17/03/2024`}
        breadCrumb={breadCrumb}
      />
      <UserPageWrapper>
        <FilterBlockDate
          resetUrl={resetUrl}
          startDate=""
          endDate=""
          setResult={setResult}
        />

        <div className="col-12">
          <div className="card">
            {result.length > 0 && <ExportBtnGroup allDataApi={allDataApi} />}

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">{colTwo}</th>
                      <th className="bg-dark text-white">{colThree}</th>
                      <th className="bg-dark text-white">
                        Services Delivered at DS
                      </th>
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
                                <td>{row.delivered || 0}</td>
                              </tr>
                            );
                          })}
                        {result.length > 0 ? (
                          <tr>
                            <th className="bg-dark text-white" colSpan={3}>
                              TOTAL
                            </th>
                            <th className="bg-dark text-white">
                              {totalDelivered}
                            </th>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center">
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

export default DsStaticAtFive;
