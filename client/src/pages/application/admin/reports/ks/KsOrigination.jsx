import React from "react";
import {
  FilterKsOrigin,
  KsOriginReportOne,
  KsOriginReportTwo,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import { Link, useLocation } from "react-router-dom";

const KsOrigination = () => {
  document.title = `Application Origination Report | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // Report based static data starts ------
  const breadCrumb = <Link to="/admin/reports">Back to Reports</Link>;
  const resetUrl = `/admin/reports/ks/origination`;
  // Report based static data ends ------

  return (
    <>
      <UserPageHeader
        title={`Application Origination Report`}
        breadCrumb={breadCrumb}
      />
      <UserPageWrapper>
        <FilterKsOrigin resetUrl={resetUrl} />
        {queryParams.get("dist") ? (
          <>
            {queryParams.get("otype") === "ALL" &&
            queryParams.get("status") === "ALL" ? (
              <KsOriginReportOne />
            ) : (
              <KsOriginReportTwo />
            )}
          </>
        ) : (
          <div className="col-12">
            <div className="card">
              <div className="card-body p-2">
                <div className="table-responsive">
                  <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                    <tbody>
                      <tr>
                        <td className="text-center">NO DATA FOUND</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </UserPageWrapper>
    </>
  );
};

export default KsOrigination;
