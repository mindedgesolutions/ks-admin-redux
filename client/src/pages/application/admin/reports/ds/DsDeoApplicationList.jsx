import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ModalViewApplication,
  PaginationContainer,
  ReportTableLoader,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../../components";
import customFetch from "../../../../../utils/customFetch";
import { splitErrors } from "../../../../../utils/showErrors";
import { nanoid } from "nanoid";
import { FaRegFolder } from "react-icons/fa6";
import { dateFormat } from "../../../../../utils/functions";
import {
  setDeoApp,
  setReligions,
  setSubdivs,
} from "../../../../../features/deo/deoSlice";
import { useDispatch, useSelector } from "react-redux";

// Main component starts ------
const DsDeoApplicationList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { religions, subdivs } = useSelector((store) => store.deo);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const filter = JSON.parse(localStorage.getItem("filter"));
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const idLabel = Number(id) === 7 ? `VII` : `VIII`;
  const page = filter.page ? `?page=${Number(filter.page)}` : ``;
  const returnUrl = `/admin/reports/ds/deo-list/${id}${page}`;

  const breadCrumb = <Link to={returnUrl}>Back to DEO List</Link>;

  const fetchReport = async () => {
    try {
      setIsLoading(true);
      const response = await customFetch.get(`/reports/deo-applications`, {
        params: {
          dist: filter.filterDist,
          subdiv: filter.filterSubdiv || "",
          block: filter.filterBlock || "",
          status: filter.status,
          userId: filter.userId,
          version: filter.version,
          page: queryParams.get("page") || "",
        },
      });
      setResult(response.data.data.rows);
      setMetaData(response.data.meta);

      if (religions.length === 0) {
        const religions = await customFetch.get(`/master/religions`);
        dispatch(setReligions(religions.data.data.rows));
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const pageCount = metaData?.totalPages;
  const currentPage = metaData?.currentPage;

  const slno =
    !queryParams.get("page") || queryParams.get("page") === 1
      ? 1
      : (queryParams.get("page") - 1) * 10 + 1;

  useEffect(() => {
    fetchReport();
  }, [queryParams.get("page")]);

  const showDeoModal = (id) => {
    const app = result.find((c) => c.id === id);
    dispatch(setDeoApp(app));
  };

  return (
    <>
      <UserPageHeader
        title={`DS ${idLabel} Applications by ${filter?.name?.toUpperCase()} | Status : ${filter?.status?.toUpperCase()}`}
        breadCrumb={breadCrumb}
      />

      <UserPageWrapper>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              Total{" "}
              <span className="text-warning mx-1">{metaData.totalRecords}</span>{" "}
              applications found
            </div>

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">Sl. No.</th>
                      <th className="bg-dark text-white">Name</th>
                      <th className="bg-dark text-white">Identification No.</th>
                      <th className="bg-dark text-white">Mobile</th>
                      <th className="bg-dark text-white">Aadhaar</th>
                      <th className="bg-dark text-white">D.O.B</th>
                      <th className="bg-dark text-white">Status</th>
                      <th className="bg-dark text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={8}>
                          <ReportTableLoader />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {result.length > 0 &&
                          result.map((row, index) => {
                            return (
                              <tr key={nanoid()}>
                                <td>{slno + index}.</td>
                                <td>{row?.name?.toUpperCase()}</td>
                                <td>{row?.identification_number}</td>
                                <td>{row?.mobile}</td>
                                <td>{row?.aadhar_no}</td>
                                <td>{dateFormat(row?.dob)}</td>
                                <td>{filter.status.toUpperCase()}</td>
                                <td>
                                  <FaRegFolder
                                    title="View"
                                    className="me-2 fs-3 text-yellow cursor-pointer"
                                    size={16}
                                    onClick={() => showDeoModal(row.id)}
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

        <ModalViewApplication />
        <PaginationContainer pageCount={pageCount} currentPage={currentPage} />
      </UserPageWrapper>
    </>
  );
};

export default DsDeoApplicationList;
