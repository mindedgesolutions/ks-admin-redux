import React, { useEffect, useState } from "react";
import customFetch from "../../../utils/customFetch";
import {
  blockLabel,
  blockType,
  genders,
  migrationTypes,
  reportNames,
} from "../../../utils/data";
import { splitErrors } from "../../../utils/showErrors";
import { Form, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import DatePicker from "react-datepicker";

const DsApplicationStatusFilters = ({ districts, reportName, resetUrl }) => {
  const navigate = useNavigate();

  const [district, setDistrict] = useState("");
  const [subDiv, setSubDiv] = useState("");
  const [blType, setBlType] = useState("");
  const [blCode, setBlCode] = useState("");
  const [typeName, setTypeName] = useState("block");
  const [startDate, setStartDate] = useState(new Date("09-01-2023")); // default date format MM-dd-yyyy
  const [endDate, setEndDate] = useState(new Date()); // default date format MM-dd-yyyy
  const dateLabel =
    reportName === reportNames[0].name ? "Camp date (start)" : "Start date";

  const allDist = {
    district_code: import.meta.env.VITE_ALL_DISTRICTS,
    district_name: "All",
  };
  districts = [...districts, allDist];

  const [subDivList, setSubDivList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const getSubDivisions = async () => {
    if (district) {
      try {
        const { data } = await customFetch.get(
          `/master/sub-divisions/${district}`
        );
        setSubDivList(data.data.rows);
        setBlockList([]);
        setWardList([]);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        return error;
      }
    }
  };

  const getBlockList = async () => {
    if (subDiv && blType) {
      try {
        const { data } = await customFetch.get(
          `/master/blocks/${subDiv}/${blType}`
        );
        setBlockList(data.data.rows);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        return error;
      }
    }
  };

  const getWardList = async () => {
    if (blCode) {
      try {
        const { data } = await customFetch.get(`/master/wards/${blCode}`);
        setWardList(data.data.rows);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        return error;
      }
    }
  };

  const handleReset = () => {
    setDistrict(""); // Auto-fill rest of the dropdowns when district has same value
    // setSubDiv("");
    // setBlType("");
    // setBlCode("");
    navigate(resetUrl);
  };

  useEffect(() => {
    getSubDivisions();
    getBlockList();
    getWardList();
  }, [district, subDiv, blType, blCode]);

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setBlType("");
    setBlCode("");
  };

  const handleSubDivChange = (e) => {
    setSubDiv(e.target.value);
  };

  const handleBlTypeChange = (e) => {
    setBlType(e.target.value);
    setTypeName(e.target.value);
  };

  const handleBlChange = (e) => {
    setBlCode(e.target.value);
  };

  return (
    <>
      <div className="col-12">
        <Form autoComplete="off">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Filter data</h3>
            </div>
            <div className="card-body p-2">
              <div className="row row-cards">
                <div className="mb-2 col-sm-3 col-md-3">
                  <label className={`form-label required`} htmlFor="dist">
                    Select district
                  </label>
                  <div>
                    <select
                      name="dist"
                      id="dist"
                      className="form-select"
                      onChange={handleDistrictChange}
                      value={district}
                    >
                      <option value="">- Select -</option>
                      {districts.map((district) => {
                        const { district_code, district_name } = district;
                        return (
                          <option key={district_code} value={district_code}>
                            {district_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="mb-2 col-sm-3 col-md-3">
                  <label className="form-label">Select sub-division</label>
                  <select
                    className="form-select"
                    name="subdiv"
                    id="subdiv"
                    onChange={handleSubDivChange}
                    value={subDiv}
                  >
                    <option value="">- Select -</option>
                    {district &&
                      subDivList.map((subDiv) => {
                        const { subdiv_code, subdiv_name } = subDiv;
                        return (
                          <option key={subdiv_code} value={subdiv_code}>
                            {subdiv_name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="mb-2 col-sm-3 col-md-3">
                  <label className="form-label">
                    Select block / mun. / corp. / sez / NA
                  </label>
                  <select
                    className="form-select"
                    name="btype"
                    id="btype"
                    onChange={handleBlTypeChange}
                    value={blType}
                  >
                    <option value="">- Select -</option>
                    {district &&
                      subDiv &&
                      blockType.map((type) => {
                        const { id, value, text } = type;
                        return (
                          <option key={id} value={value}>
                            {text}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="mb-2 col-sm-3 col-md-3">
                  <label className="form-label">
                    Select {blockLabel(typeName).toLowerCase() || "block"} name
                  </label>
                  <select
                    className="form-select"
                    name="block"
                    id="block"
                    onChange={handleBlChange}
                    value={blCode}
                  >
                    <option value="">- Select -</option>
                    {district &&
                      subDiv &&
                      // blType &&
                      blockList.map((block) => {
                        const { block_mun_code, block_mun_name } = block;
                        return (
                          <option key={block_mun_code} value={block_mun_code}>
                            {block_mun_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="row row-cards">
                <div className="mb-2 col-sm-3 col-md-3">
                  <label className="form-label">Select ward / village</label>
                  <select className="form-select" name="ward" id="ward">
                    <option value="">- Select -</option>
                    {district &&
                      subDiv &&
                      blType &&
                      blCode &&
                      wardList.map((ward) => {
                        const { village_ward_code, village_ward_name } = ward;
                        return (
                          <option
                            key={village_ward_code}
                            value={village_ward_code}
                          >
                            {village_ward_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="row row-cards">
                <div className="mb-2 col-sm-3 col-md-3">
                  <label className="form-label">Select migration type</label>
                  <select className="form-select" name="mig">
                    <option value="">- Select -</option>
                    {migrationTypes.map((migrationType) => {
                      const { value, label } = migrationType;
                      return (
                        <option key={nanoid()} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3 col-sm-3 col-md-3">
                  <label className="form-label">Select gender</label>
                  <select className="form-select" name="gender" id="gender">
                    <option value="">- Select -</option>
                    {genders.map((gender) => {
                      const { id, value, text } = gender;
                      return (
                        <option key={id} value={value}>
                          {text}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3 col-sm-3 col-md-3">
                  <label className="form-label">{dateLabel}</label>
                  <DatePicker
                    className="form-control"
                    name="start"
                    dateFormat={import.meta.env.VITE_DATE_FORMAT}
                    selected={startDate}
                    minDate={new Date("09-01-2023")}
                    maxDate={endDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                {reportName === reportNames[0].name && (
                  <div className="mb-3 col-sm-3 col-md-3">
                    <label className="form-label">Camp date (end)</label>
                    <DatePicker
                      className="form-control"
                      name="end"
                      dateFormat={import.meta.env.VITE_DATE_FORMAT}
                      selected={endDate}
                      minDate={startDate}
                      maxDate={new Date()}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary me-2">
                Filter data
              </button>
              {/* <Link to="/reports/ds/application-status"> */}
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-default ms-2"
              >
                Reset list
              </button>
              {/* </Link> */}
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default DsApplicationStatusFilters;
