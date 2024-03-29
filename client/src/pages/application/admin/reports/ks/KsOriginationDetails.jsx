import { nanoid } from "nanoid";
import React from "react";
import { FaRegFolder } from "react-icons/fa6";
import {
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import { Link, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import customFetch from "../../../../../utils/customFetch";
import { setReportDataMultiple } from "../../../../../features/reports/reportSlice";
import { splitErrors } from "../../../../../utils/showErrors";

// Loader starts ------
export const loader = (store) => async () => {
  const filters = JSON.parse(localStorage.getItem("filter"));
  const params = {
    dist: filters.filterDist,
    subdiv: filters.filterSubdiv,
    block: filters.filterBlock,
  };
  const stReports = store.getState().reports.reportData;
  try {
    if (!stReports || stReports.length === 0) {
      const reports = await customFetch.get(`/reports/ks-origination-details`, {
        params: params,
      });
      const result = {
        bsk: reports.data.data[0].rows,
        ds: reports.data.data[1].rows,
        sd: reports.data.data[2].rows,
      };
      store.dispatch(setReportDataMultiple(result));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const KsOriginationDetails = () => {
  const navigation = useNavigation();
  const { reportDataMultiple } = useSelector((store) => store.reports);

  const labels = JSON.parse(localStorage.getItem("labels"));
  const params = JSON.parse(localStorage.getItem("search"));
  const filters = JSON.parse(localStorage.getItem("filter"));

  let locLabel;
  locLabel = labels.block ? labels.block.toUpperCase() + ", " : "";
  locLabel = labels.subdiv ? locLabel + labels.subdiv.toUpperCase() + ", " : "";
  locLabel = labels.dist ? locLabel + labels.dist.toUpperCase() : "";

  document.title = `Application Origination Report for ${locLabel} | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;
  const breadCrumb = (
    <Link
      to={`/admin/reports/ks/origination?dist=${params.dist}&subdiv=${
        params.subdiv || ""
      }&btype=${params.btype || ""}&block=${params.block || ""}`}
    >
      Back to Origination Report
    </Link>
  );

  // Set column labels start ------
  let colTwo = `DISTRICT`,
    colThree = `SUB-DIVISION`;

  if (filters.filterDist && !filters.filterSubdiv) {
    colTwo = `DISTRICT`;
    colThree = `SUB-DIVISION`;
  }
  if (filters.filterSubdiv && !filters.filterBlock) {
    colTwo = `SUB-DIVISION`;
    colThree = `BLOCK / MUNICIPALITY`;
  }
  if (filters.filterBlock) {
    colTwo = `BLOCK / MUNICIPALITY`;
    colThree = `VILLAGE / WARD`;
  }
  // Set column labels end ------

  return (
    <>
      <UserPageHeader
        title={`Origination Report for ${locLabel}`}
        breadCrumb={breadCrumb}
      />
      <UserPageWrapper>
        <div className="col-12">
          {Object.keys(reportDataMultiple).map((i) => {
            const type =
              i === "bsk"
                ? reportDataMultiple.bsk
                : i === "ds"
                ? reportDataMultiple.ds
                : reportDataMultiple.sd;

            const totalProvisional = type.reduce(
              (t, c) => Number(t) + Number(c.totalprovisional),
              0
            );
            const totalSubmitted = type.reduce(
              (t, c) => Number(t) + Number(c.totalsubmitted),
              0
            );
            const totalBack = type.reduce(
              (t, c) => Number(t) + Number(c.totalback),
              0
            );
            const totalRejected = type.reduce(
              (t, c) => Number(t) + Number(c.totalrejected),
              0
            );
            const totalPermanent = type.reduce(
              (t, c) => Number(t) + Number(c.totalapproved),
              0
            );

            return (
              <div className="card mb-4" key={nanoid()}>
                <div className="card-header fw-bold text-uppercase text-danger">
                  Status of <span className="text-danger mx-1">{i}</span>{" "}
                  applications
                </div>

                <div className="card-body p-2">
                  <div className="table-responsive">
                    <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                      <thead>
                        <tr>
                          <th className="bg-dark text-white">Sl. No.</th>
                          <th className="bg-dark text-white">{colTwo}</th>
                          <th className="bg-dark text-white">{colThree}</th>
                          <th className="bg-dark text-white">
                            Provisional MWIN
                          </th>
                          <th className="bg-dark text-white">Doc. Uploaded</th>
                          <th className="bg-dark text-white">Under Process</th>
                          <th className="bg-dark text-white">Rejected</th>
                          <th className="bg-dark text-white">Permanent MWIN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {navigation.state === "loading" && (
                          <tr>
                            <td colSpan={8}>
                              <ReportTableLoader />
                            </td>
                          </tr>
                        )}
                        <>
                          {type.map((row, index) => {
                            // Set column 2 and 3 values start ------
                            let colTwoLabel, colThreeLabel;
                            if (filters.filterDist && !filters.filterSubdiv) {
                              colTwoLabel = row?.district_name?.toUpperCase();
                              colThreeLabel = row?.subdiv_name
                                ?.trim()
                                ?.toUpperCase();
                            } else if (
                              filters.filterSubdiv &&
                              !filters.filterBlock
                            ) {
                              colTwoLabel = row?.subdiv_name
                                ?.trim()
                                ?.toUpperCase();
                              colThreeLabel = row?.block_mun_name
                                ?.trim()
                                ?.toUpperCase();
                            } else if (filters.filterBlock) {
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
                                <td>{row.totalprovisional || 0}</td>
                                <td>{row.totalsubmitted || 0}</td>
                                <td>{row.totalback || 0}</td>
                                <td>{row.totalrejected || 0}</td>
                                <td>{row.totalapproved || 0}</td>
                              </tr>
                            );
                          })}
                          {type.length > 0 ? (
                            <tr>
                              <th className="bg-dark text-white" colSpan={3}>
                                TOTAL
                              </th>
                              <th className="bg-dark text-white">
                                {totalProvisional || 0}
                              </th>
                              <th className="bg-dark text-white">
                                {totalSubmitted || 0}
                              </th>
                              <th className="bg-dark text-white">
                                {totalBack || 0}
                              </th>
                              <th className="bg-dark text-white">
                                {totalRejected || 0}
                              </th>
                              <th className="bg-dark text-white">
                                {totalPermanent || 0}
                              </th>
                            </tr>
                          ) : (
                            <tr>
                              <td colSpan={9} className="text-center">
                                NO DATA FOUND
                              </td>
                            </tr>
                          )}
                        </>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </UserPageWrapper>
    </>
  );
};

export default KsOriginationDetails;
