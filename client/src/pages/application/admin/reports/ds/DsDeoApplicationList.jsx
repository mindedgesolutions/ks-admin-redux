import React, { useEffect, useState } from "react";
import {
  Form,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
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
  setCountries,
  setStates,
  setJobs,
} from "../../../../../features/deo/deoSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";

// Main component starts ------
const DsDeoApplicationList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { religions, countries, states, jobs } = useSelector(
    (store) => store.deo
  );

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const filter = JSON.parse(localStorage.getItem("filter"));
  const { search, pathname } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [searchString, setSearchString] = useState(queryParams.get("s") || "");

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
          quickSearch: queryParams.get("s") || "",
        },
      });
      setResult(response.data.data.rows);
      setMetaData(response.data.meta);

      if (religions.length === 0) {
        const religions = await customFetch.get(`/master/religions`);
        dispatch(setReligions(religions.data.data.rows));
      }

      if (countries.length === 0) {
        const countries = await customFetch.get(`/master/countries`);
        dispatch(setCountries(countries.data.data.rows));
      }

      if (states.length === 0) {
        const states = await customFetch.get(`/master/states`);
        dispatch(setStates(states.data.data.rows));
      }

      if (jobs.length === 0) {
        const jobs = await customFetch.get(`/master/jobs`);
        dispatch(setJobs(jobs.data.data.rows));
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const removeSearch = () => {
    setSearchString("");
    navigate(pathname);
  };

  const pageCount = metaData?.totalPages;
  const currentPage = metaData?.currentPage;

  const slno =
    !queryParams.get("page") || queryParams.get("page") === 1
      ? 1
      : (queryParams.get("page") - 1) * 10 + 1;

  useEffect(() => {
    fetchReport();
  }, [queryParams.get("page"), queryParams.get("s")]);

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
              <div className="col-auto ms-auto d-print-none">
                <Form method="GET">
                  <div className="btn-list">
                    <span className="d-none d-sm-inline">
                      <div className="input-icon">
                        <input
                          type="text"
                          name="s"
                          value={searchString}
                          className="form-control"
                          placeholder="Search by name..."
                          onChange={(e) => setSearchString(e.target.value)}
                        />
                      </div>
                    </span>
                    <span className="d-none d-sm-inline">
                      <button
                        type="submit"
                        className="btn btn-primary d-none d-sm-inline-block me-2"
                      >
                        <IoIosSearch className="fs-3" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-default d-none d-sm-inline-block"
                        onClick={removeSearch}
                      >
                        <IoReloadSharp className="fs-3" />
                      </button>
                    </span>
                  </div>
                </Form>
              </div>
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
