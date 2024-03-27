import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../../../utils/customFetch";
import {
  setReportData,
  setSearch,
  unsetSearch,
} from "../../../../../features/reports/reportSlice";
import { splitErrors } from "../../../../../utils/showErrors";
import {
  ExportBtnGroup,
  FilterBlockDate,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import { nanoid } from "nanoid";
import { unsetReports } from "../../../../../features/deo/deoSlice";

const DsDeo = () => {
  const { id } = useParams();
  const idLabel = Number(id) === 7 ? "VII" : "VIII";
  document.title = `Duare Sarkar ${idLabel} DEO Report | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;

  // Report based static data starts ------
  const allDataApi = `/reports/ds-static-all`;
  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ds/deo/${id}`;
  // Report based static data ends ------

  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const { districts } = useSelector((store) => store.districts);
  const { subdivs } = useSelector((store) => store.msubdivs);
  const { blocks } = useSelector((store) => store.mblocks);

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
  }
  // Set column labels end ------

  const fetchReport = async () => {
    if (queryParams.get("dist")) {
      setIsLoading(true);
      try {
        const response = await customFetch.get(`/reports/deo-count`, {
          params: {
            dist: queryParams.get("dist"),
            subdiv: queryParams.get("subdiv") || "",
            block: queryParams.get("block") || "",
            version: id,
          },
        });
        setResult(response.data.data.rows);
        setIsLoading(false);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        setIsLoading(false);
        return error;
      }
    }
  };

  const totalDeo = result.reduce((t, c) => Number(t) + Number(c.deocount), 0);

  useEffect(() => {
    fetchReport();
  }, [
    queryParams.get("dist"),
    queryParams.get("subdiv"),
    queryParams.get("btype"),
    queryParams.get("block"),
  ]);

  const gotoDeoList = (filterDist, filterSubdiv, filterBlock, count) => {
    setIsLoading(true);

    const selectSubdiv = filterSubdiv || Number(queryParams.get("subdiv"));
    const selectBlock = filterBlock || Number(queryParams.get("block"));

    const dist = districts.find(
      (c) => c.district_code === filterDist
    ).district_name;
    const subdiv = subdivs?.find(
      (c) => c.subdiv_code === selectSubdiv
    )?.subdiv_name;
    const block = blocks.find(
      (c) => c.block_mun_code === selectBlock
    )?.block_mun_name;

    dispatch(unsetSearch());
    dispatch(unsetReports());

    dispatch(
      setSearch({
        search: {
          dist: queryParams.get("dist"),
          subdiv: queryParams.get("subdiv") || null,
          btype: queryParams.get("btype") || null,
          block: queryParams.get("block") || null,
        },
        deoFilter: {
          filterDist: filterDist,
          filterSubdiv: filterSubdiv || "",
          filterBlock: filterBlock || "",
          version: id,
        },
        deoLabels: {
          dist: dist,
          subdiv: subdiv || null,
          block: block || null,
          count: count || 0,
        },
      })
    );
    setIsLoading(false);
    navigate(`/admin/reports/ds/deo-list/${id}`);
  };

  return (
    <>
      <UserPageHeader
        title={`Duare Sarkar ${idLabel} DEO Report`}
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
                      {!queryParams.get("block") && (
                        <th className="bg-dark text-white">{colThree}</th>
                      )}
                      <th className="bg-dark text-white">Total DEO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={!queryParams.get("block") ? 9 : 8}>
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
                            }
                            // Set column 2 and 3 values end ------

                            return (
                              <tr key={nanoid()}>
                                <td>{index + 1}.</td>
                                <td>{colTwoLabel}</td>
                                {!queryParams.get("block") && (
                                  <td>{colThreeLabel}</td>
                                )}
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    style={{ minWidth: 40 }}
                                    onClick={() =>
                                      gotoDeoList(
                                        row?.district_code,
                                        row?.subdiv_code,
                                        row?.block_mun_code,
                                        row.deocount
                                      )
                                    }
                                  >
                                    {row.deocount || 0}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        {result.length > 0 ? (
                          <tr>
                            <th
                              className="bg-dark text-white"
                              colSpan={!queryParams.get("block") ? 3 : 2}
                            >
                              TOTAL
                            </th>
                            <th className="bg-dark text-white">{totalDeo}</th>
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

export default DsDeo;
