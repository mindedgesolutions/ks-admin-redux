import React from "react";
import {
  Link,
  useLoaderData,
  useLocation,
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
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const params = JSON.parse(localStorage.getItem("search"));
  const returnUrl = `/admin/reports/ds/deo/${id}?dist=${params.dist}&subdiv=${
    params.subdiv || ""
  }&btype=${params.btype || ""}&block=${params.block || ""}`;
  const response = useLoaderData();
  const navigation = useNavigation();

  const breadCrumb = <Link to={returnUrl}>Back to DEO Report</Link>;

  const pageCount = response.data.meta.totalPages;
  const currentPage = response.data.meta.currentPage;
  const slno =
    !queryParams.get("page") || queryParams.get("page") === 1
      ? 1
      : (queryParams.get("page") - 1) * 10 + 1;

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
                                <td>{slno + index}.</td>
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
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <PaginationContainer pageCount={pageCount} currentPage={currentPage} />
      </UserPageWrapper>
    </>
  );
};

export default DsDeoList;
