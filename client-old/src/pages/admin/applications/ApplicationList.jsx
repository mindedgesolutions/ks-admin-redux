import React, { useState } from "react";
import customFetch from "../../../utils/customFetch";
import {
  PageHeader,
  PageLoader,
  PageWrapper,
  PaginationContainer,
  ApplicationFilter,
} from "../../../components";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { nanoid } from "nanoid";
import { splitErrors } from "../../../utils/showErrors";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { applicationStatus } from "../../../utils/functions";

export const loader = async ({ request }) => {
  const status = new URL(request.url).searchParams.get("status");
  let params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  params = { ...params, ...{ status: status } };

  try {
    const reports = await customFetch.get("/applications/all", { params });
    return { reports, params };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const ApplicationList = () => {
  document.title = `Duare Sarkar Applications | ${
    import.meta.env.VITE_ADMIN_TITLE
  }`;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const { reports } = useLoaderData();
  const reportList = reports.data.data.rows;
  const resultCount = reports.data.totalRows.rows[0].count;
  const pageCount = reports.data.meta.totalPages;
  const currentPage = reports.data.meta.currentPage;

  return (
    <>
      <PageHeader title="Duare Sarkar Applications" />
      <PageWrapper>
        <ApplicationFilter />

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              Total <span className="text-warning mx-1">{resultCount}</span>{" "}
              results in <span className="text-danger mx-1">{pageCount}</span>
              pages
            </div>

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-striped table-hover table-bordered card-table">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">MWIN</th>
                      <th className="bg-dark text-white">WORKER NAME</th>
                      <th className="bg-dark text-white">MOBILE NO.</th>
                      <th className="bg-dark text-white">STATUS</th>
                      <th className="bg-dark text-white">ACTION</th>
                    </tr>
                  </thead>

                  {isLoading ? (
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <PageLoader />
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {reportList.map((report, index) => {
                        const slno = (currentPage - 1) * 10 + index + 1;
                        const key = nanoid();

                        const {
                          id,
                          identification_number,
                          name,
                          mobile,
                          status,
                        } = report;

                        const statusLabel = applicationStatus(status);

                        return (
                          <tr key={key} className="fs-5">
                            <td>{slno}.</td>
                            <td>{identification_number}</td>
                            <td className="text-uppercase">{name}</td>
                            <td>{mobile}</td>
                            <td className="text-uppercase">{statusLabel}</td>
                            <td>
                              <div className="d-flex">
                                <Link to={`/admin/applications/${id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary me-1 px-1"
                                  >
                                    <AiOutlineEye className="me-1" /> View
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success ms-1 px-1"
                                >
                                  <AiOutlineEdit className="me-1" /> Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>

            <PaginationContainer
              pageCount={pageCount}
              resultCount={resultCount}
              currentPage={currentPage}
            />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default ApplicationList;
