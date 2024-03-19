import React from "react";
import {
  Link,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import {
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import customFetch from "../../../../../utils/customFetch";
import { splitErrors } from "../../../../../utils/showErrors";
import { nanoid } from "nanoid";

export const loader = async () => {
  const filter = JSON.parse(localStorage.getItem("filter"));
  try {
    const response = await customFetch.get(`/reports/deo-list`, {
      params: {
        dist: filter.filterDist,
        subdiv: filter.filterSubdiv || "",
        block: filter.filterBlock || "",
        version: filter.version,
      },
    });
    return response;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const DsDeoList = () => {
  const { id } = useParams();
  const params = JSON.parse(localStorage.getItem("search"));
  const returnUrl = `/admin/reports/ds/deo/${id}?dist=${params.dist}&subdiv=${
    params.subdiv || ""
  }&btype=${params.btype || ""}&block=${params.block || ""}`;
  const response = useLoaderData();
  const navigation = useNavigation();

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
                      <th className="bg-dark text-white">Name</th>
                      <th className="bg-dark text-white">Mobile</th>
                      <th className="bg-dark text-white">Email</th>
                      <th className="bg-dark text-white">Provisional</th>
                      <th className="bg-dark text-white">Submitted</th>
                      <th className="bg-dark text-white">Approved</th>
                      <th className="bg-dark text-white">Rejected</th>
                      <th className="bg-dark text-white">
                        Service NOT Provided
                      </th>
                      <th className="bg-dark text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {navigation.state === "loading" ? (
                      <tr>
                        <td colSpan={10}>
                          <ReportTableLoader />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {response.data.data.rowCount > 0 &&
                          response.data.data.rows.map((row, index) => {
                            console.log(row);
                            return (
                              <tr key={nanoid()}>
                                <td>{index + 1}.</td>
                                <td>{row?.name?.toUpperCase()}</td>
                                <td>{row?.mobile}</td>
                                <td>{row?.email}</td>
                                <td>{row?.provisinol}</td>
                                <td>{row?.subbmitted}</td>
                                <td>{row?.approved}</td>
                                <td>{row?.reject}</td>
                                <td></td>
                                <td></td>
                              </tr>
                            );
                          })}
                        {response.data.data.rowCount > 0 ? (
                          <tr>
                            <th className="bg-dark text-white" colSpan={4}>
                              TOTAL
                            </th>
                            <th className="bg-dark text-white">00</th>
                            <th className="bg-dark text-white">00</th>
                            <th className="bg-dark text-white">00</th>
                            <th className="bg-dark text-white">00</th>
                            <th className="bg-dark text-white">00</th>
                            <th className="bg-dark text-white">00</th>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan={10} className="text-center">
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

export default DsDeoList;
