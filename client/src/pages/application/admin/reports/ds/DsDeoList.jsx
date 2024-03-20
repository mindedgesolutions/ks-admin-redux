import React from "react";
import {
  Link,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import {
  PaginationContainer,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import customFetch from "../../../../../utils/customFetch";
import { splitErrors } from "../../../../../utils/showErrors";
import { nanoid } from "nanoid";
import { FaRegFolder } from "react-icons/fa6";

// Loader starts ------
export const loader = async ({ request }) => {
  const filter = JSON.parse(localStorage.getItem("filter"));
  let params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  params = {
    ...params,
    dist: filter.filterDist,
    subdiv: filter.filterSubdiv || "",
    block: filter.filterBlock || "",
    version: filter.version,
  };
  try {
    const response = await customFetch.get(`/reports/deo-list`, {
      params: params,
    });
    return response;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const DsDeoList = () => {
  const { id } = useParams();
  const params = JSON.parse(localStorage.getItem("search"));
  const returnUrl = `/admin/reports/ds/deo/${id}?dist=${params.dist}&subdiv=${
    params.subdiv || ""
  }&btype=${params.btype || ""}&block=${params.block || ""}`;
  const response = useLoaderData();
  const navigation = useNavigation();

  const breadCrumb = <Link to={returnUrl}>Back to DEO Report</Link>;

  const pageCount = response.data.meta.totalPages;
  const currentPage = response.data.meta.currentPage;
  console.log(pageCount);

  // Row and Table totals start ------
  const totalProvisional = response.data.data.rows.reduce(
    (t, c) => Number(t) + Number(c.provisional),
    0
  );
  const totalSubmitted = response.data.data.rows.reduce(
    (t, c) => Number(t) + Number(c.submitted),
    0
  );
  const totalApproved = response.data.data.rows.reduce(
    (t, c) => Number(t) + Number(c.approved),
    0
  );
  const totalReject = response.data.data.rows.reduce(
    (t, c) => Number(t) + Number(c.reject),
    0
  );
  // Row and Table totals end ------

  return (
    <>
      <UserPageHeader
        title={`Duare Sarkar DEO Report`}
        breadCrumb={breadCrumb}
        postTitle={`* Service NOT Provided`}
        textClass={`text-danger`}
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
                      <th className="bg-dark text-white">SNP *</th>
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
                            return (
                              <tr key={nanoid()}>
                                <td>{index + 1}.</td>
                                <td>{row?.name?.toUpperCase()}</td>
                                <td>{row?.mobile}</td>
                                <td>{row?.email}</td>
                                <td>{row?.provisional}</td>
                                <td>{row?.submitted}</td>
                                <td>{row?.approved}</td>
                                <td>{row?.reject}</td>
                                <td></td>
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
                        {response.data.data.rowCount > 0 ? (
                          <tr>
                            <th className="bg-dark text-white" colSpan={4}>
                              TOTAL
                            </th>
                            <th className="bg-dark text-white">
                              {totalProvisional}
                            </th>
                            <th className="bg-dark text-white">
                              {totalSubmitted}
                            </th>
                            <th className="bg-dark text-white">
                              {totalApproved}
                            </th>
                            <th className="bg-dark text-white">
                              {totalReject}
                            </th>
                            <th className="bg-dark text-white">00</th>
                            <th className="bg-dark text-white"></th>
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

      <PaginationContainer pageCount={pageCount} currentPage={currentPage} />
    </>
  );
};

export default DsDeoList;
