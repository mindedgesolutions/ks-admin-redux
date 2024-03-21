import React from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import {
  ModalDeoDetails,
  PaginationContainer,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import customFetch from "../../../../../utils/customFetch";
import { splitErrors } from "../../../../../utils/showErrors";
import { nanoid } from "nanoid";
import { FaRegFolder } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setDeo, setReport } from "../../../../../features/deo/deoSlice";

// Loader starts ------
export const loader = (store) => async ({ request }) => {
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
  const stReports = store.getState().deo.reports;
  try {
    const response = await customFetch.get(`/reports/deo-list`, {
      params: params,
    });
    if (stReports.length === 0) {
      const reports = await customFetch.get(`/reports/deo-entries`, {
        params: {
          dist: filter.filterDist,
          subdiv: filter.filterSubdiv || "",
          block: filter.filterBlock || "",
          version: filter.version,
        },
      });
      store.dispatch(setReport(reports.data.data.rows));
    }
    return { response };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const DsDeoList = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const { response } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(search);

  const { reports } = useSelector((store) => store.deo);
  const params = JSON.parse(localStorage.getItem("search"));
  const labels = JSON.parse(localStorage.getItem("labels"));

  let locLabel;
  locLabel = labels.block ? labels.block.toUpperCase() + ", " : "";
  locLabel = labels.subdiv ? locLabel + labels.subdiv.toUpperCase() + ", " : "";
  locLabel = labels.dist ? locLabel + labels.dist.toUpperCase() : "";

  const returnUrl = `/admin/reports/ds/deo/${id}?dist=${params.dist}&subdiv=${
    params.subdiv || ""
  }&btype=${params.btype || ""}&block=${params.block || ""}`;

  const breadCrumb = <Link to={returnUrl}>Back to DEO Report</Link>;

  const pageCount = response.data.meta.totalPages;
  const currentPage = response.data.meta.currentPage;
  const slno =
    !queryParams.get("page") || queryParams.get("page") === 1
      ? 1
      : (queryParams.get("page") - 1) * 10 + 1;

  const viewDeo = (id) => {
    const deo = response?.data?.data?.rows.find((c) => c.id === id);
    dispatch(setDeo(deo));
  };

  const goToDeoApplicationList = (status, userId, name) => {
    const filter = JSON.parse(localStorage.getItem("filter"));
    const newFilter = {
      ...filter,
      userId: userId,
      status: status,
      page: queryParams.get("page"),
      name: name,
    };
    localStorage.setItem("filter", JSON.stringify(newFilter));

    navigate(`/admin/reports/ds/deo-application-list/${id}`);
  };

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
            <div className="card-header">
              Total <span className="text-warning mx-1">{labels.count}</span>{" "}
              results in <span className="text-danger mx-1">{locLabel}</span>
            </div>

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">Name</th>
                      <th className="bg-dark text-white">Mobile</th>
                      <th className="bg-dark text-white">Email</th>
                      <th className="bg-dark text-white">Status</th>
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
                        {response?.data?.data?.rowCount > 0 &&
                          response?.data?.data?.rows.map((row, index) => {
                            const data = reports.find(
                              (c) =>
                                Number(c.created_by) === Number(row.user_id)
                            );

                            return (
                              <tr key={nanoid()}>
                                <td>{slno + index}.</td>
                                <td>{row?.name?.toUpperCase()}</td>
                                <td>{row?.mobile}</td>
                                <td>{row?.email}</td>
                                <td>
                                  {row?.is_active ? (
                                    <span className="badge bg-green-lt">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-red-lt">
                                      Deact.
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light btn-sm w-75"
                                    onClick={() =>
                                      goToDeoApplicationList(
                                        "provisional",
                                        row.user_id,
                                        row.name
                                      )
                                    }
                                  >
                                    {data?.provisional || 0}
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light btn-sm w-75"
                                    onClick={() =>
                                      goToDeoApplicationList(
                                        "submitted",
                                        row.user_id,
                                        row.name
                                      )
                                    }
                                  >
                                    {data?.submitted || 0}
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light btn-sm w-75"
                                    onClick={() =>
                                      goToDeoApplicationList(
                                        "approved",
                                        row.user_id,
                                        row.name
                                      )
                                    }
                                  >
                                    {data?.approved || 0}
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light btn-sm w-75"
                                    onClick={() =>
                                      goToDeoApplicationList(
                                        "reject",
                                        row.user_id,
                                        row.name
                                      )
                                    }
                                  >
                                    {data?.reject || 0}
                                  </button>
                                </td>
                                <td></td>
                                <td>
                                  <FaRegFolder
                                    title="View"
                                    className="me-2 fs-3 text-yellow cursor-pointer"
                                    size={16}
                                    onClick={() => viewDeo(row.id)}
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
        <ModalDeoDetails />
        <PaginationContainer pageCount={pageCount} currentPage={currentPage} />
      </UserPageWrapper>
    </>
  );
};

export default DsDeoList;
