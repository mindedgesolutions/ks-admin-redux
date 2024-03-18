import React from "react";
import { Link, useParams } from "react-router-dom";
import { UserPageHeader, UserPageWrapper } from "../../../../../components";

export const loader = async () => {
  const search = JSON.parse(localStorage.getItem("search"));
  console.log(search);
  return null;
};

const DsDeoList = () => {
  const { id } = useParams();
  const params = JSON.parse(localStorage.getItem("search"));
  const returnUrl = `/admin/reports/ds/deo/${id}?dist=${params.dist}&subdiv=${
    params.subdiv || ""
  }&btype=${params.btype || ""}&block=${params.block || ""}`;

  const breadCrumb = <Link to={returnUrl}>Back to DEO Report</Link>;

  return (
    <>
      <UserPageHeader
        title={`Duare Sarkar DEO Report`}
        breadCrumb={breadCrumb}
      />
      <UserPageWrapper>
        <div className="col-12">
          <div className="card">
            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">AA</th>
                      <th className="bg-dark text-white">BB</th>
                      <th className="bg-dark text-white">Total DEO</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default DsDeoList;
