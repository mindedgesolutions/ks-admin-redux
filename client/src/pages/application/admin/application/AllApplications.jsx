import React from "react";
import {
  ExportBtnGroup,
  FilterAllApplication,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";

const AllApplications = () => {
  return (
    <>
      <UserPageHeader title={`Special Drive : DEO Report`} />
      <UserPageWrapper>
        <FilterAllApplication />

        <div className="col-12">
          <div className="card">
            <ExportBtnGroup />

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">SL. NO.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7}>{/* <ReportTableLoader /> */}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
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

export default AllApplications;
