import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { setReportAllData } from "../../../features/reports/reportSlice";
import { useLocation } from "react-router-dom";
import BtnSpinner from "../../BtnSpinner";

const ExportBtnGroup = ({ allDataApi }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const queryParams = new URLSearchParams(search);
  const { reportData, reportAllData } = useSelector((store) => store.reports);

  const getAllData = async () => {
    try {
      setIsLoading(true);
      const response = await customFetch.get(
        allDataApi,
        queryParams.get("start") && {
          params: {
            startDate: queryParams.get("start"),
            endDate: queryParams.get("end"),
          },
        }
      );
      dispatch(setReportAllData(response.data.data.rows));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };
  console.log(reportAllData);

  return (
    <div className="card-header justify-content-end">
      <button
        type="button"
        className="btn btn-success me-3"
        disabled={isLoading}
      >
        {isLoading && <BtnSpinner />}
        Export
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={getAllData}
        disabled={isLoading}
      >
        {isLoading && <BtnSpinner />}
        Export all data
      </button>
    </div>
  );
};

export default ExportBtnGroup;
