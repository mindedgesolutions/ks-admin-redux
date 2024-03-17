import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { getSubdivs, resetSubdiv } from "../../../features/masters/subdivSlice";
import {
  changeBlLabel,
  getBlocks,
  resetBlock,
} from "../../../features/masters/blockSlice";
import { blockType } from "../../../utils/data";
import { unsetDistricts } from "../../../features/masters/districtSlice";
import DatePicker from "react-datepicker";

const FilterBlockDate = ({ resetUrl, startDate, endDate, setResult }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const { districts } = useSelector((store) => store.districts);
  const { subdivs } = useSelector((store) => store.msubdivs);
  const { blLabel, blocks } = useSelector((store) => store.mblocks);

  const [filterStart, setFilterStart] = useState(startDate);
  const [filterEnd, setFilterEnd] = useState(endDate);

  // State management starts ------
  const [loc, setLoc] = useState({
    inputDist: queryParams.get("dist") || "",
    inputSubdiv: queryParams.get("subdiv") || "",
    inputBlType: queryParams.get("btype") || "",
    inputBlLabel: "",
    inputBlCode: queryParams.get("block") || "",
  });

  // Change district starts ------
  const handleDistChange = (e) => {
    setLoc({ ...loc, inputDist: e.target.value });
    dispatch(getSubdivs(e.target.value));
  };

  // Change sub-division starts ------
  const handleSdChange = (e) => {
    setLoc({ ...loc, inputSubdiv: e.target.value });
    const payload = {
      bltype: loc.inputBlType || null,
      sdcode: e.target.value,
    };
    dispatch(getBlocks(payload));
  };

  // Change block type starts ------
  const handleBlTypeChange = (e) => {
    setLoc({ ...loc, inputBlType: e.target.value });
    const payload = {
      bltype: e.target.value,
      sdcode: loc.inputSubdiv,
    };
    dispatch(changeBlLabel(payload));
    dispatch(getBlocks(payload));
  };

  // Reset all states ------
  const handleReset = () => {
    setLoc({
      ...loc,
      inputDist: "",
      inputSubdiv: "",
      inputBlType: "",
      inputBlLabel: "",
      inputBlCode: "",
    });

    dispatch(resetSubdiv());
    dispatch(resetBlock());
    setFilterStart(startDate);
    setFilterEnd(endDate);
    setResult([]);

    navigate(resetUrl);
  };

  // UseEffect / on load data fetch starts ------
  useEffect(() => {
    loc.inputDist && dispatch(getSubdivs(loc.inputDist));
    if (loc.inputBlType && loc.inputSubdiv) {
      dispatch(
        changeBlLabel({ bltype: loc.inputBlType, sdcode: loc.inputSubdiv })
      );
      dispatch(getBlocks({ bltype: loc.inputBlType, sdcode: loc.inputSubdiv }));
    }
  }, []);

  return (
    <div className="col-12">
      <Form method="get" autoComplete="off">
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
                <select
                  name="dist"
                  id="dist"
                  className="form-select"
                  value={loc.inputDist}
                  onChange={handleDistChange}
                >
                  <option value="">- Select district -</option>
                  {districts.map((district) => {
                    return (
                      <option key={nanoid()} value={district.district_code}>
                        {district.district_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-2 col-sm-3 col-md-3">
                <label className={`form-label`} htmlFor="subdiv">
                  Select sub-division
                </label>
                <select
                  name="subdiv"
                  id="subdiv"
                  className="form-select"
                  value={loc.inputSubdiv}
                  onChange={handleSdChange}
                >
                  <option value="">- Select sub-division -</option>
                  {subdivs.map((value) => {
                    return (
                      <option key={value.subdiv_code} value={value.subdiv_code}>
                        {value.subdiv_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-2 col-sm-3 col-md-3">
                <label htmlFor="btype" className={`form-label`}>
                  Select area type
                </label>
                <select
                  name="btype"
                  id="btype"
                  className="form-select"
                  value={loc.inputBlType}
                  onChange={handleBlTypeChange}
                >
                  <option value="">- Select area type -</option>
                  {blockType.map((type) => {
                    return (
                      <option key={nanoid()} value={type.value}>
                        {type.text}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-2 col-sm-3 col-md-3">
                <label htmlFor="block" className="form-label required">
                  {blLabel || "Block"}
                </label>
                <select
                  name="block"
                  id="block"
                  className="form-select"
                  value={loc.inputBlCode}
                  onChange={(e) =>
                    setLoc({ ...loc, inputBlCode: e.target.value })
                  }
                >
                  <option value="">
                    - Select {blLabel.toLowerCase() || "block"} -
                  </option>
                  {blocks.map((block) => {
                    return (
                      <option
                        key={block.block_mun_code}
                        value={block.block_mun_code}
                      >
                        {block.block_mun_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {startDate && (
                <div className="mb-2 col-sm-3 col-md-3">
                  <label className="form-label">Camp date (start)</label>
                  <DatePicker
                    className="form-control"
                    name="start"
                    dateFormat={import.meta.env.VITE_DATE_FORMAT}
                    selected={filterStart}
                    minDate={new Date(startDate)}
                    maxDate={filterEnd}
                    onChange={(date) => setFilterStart(date)}
                  />
                </div>
              )}
              {endDate && (
                <div className="mb-2 col-sm-3 col-md-3">
                  <label className="form-label">Camp date (end)</label>
                  <DatePicker
                    className="form-control"
                    name="end"
                    dateFormat={import.meta.env.VITE_DATE_FORMAT}
                    selected={filterEnd}
                    minDate={filterStart}
                    maxDate={new Date(endDate)}
                    onChange={(date) => setFilterEnd(date)}
                  />
                </div>
              )}
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary me-2">
                Filter data
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-default ms-2"
              >
                Reset list
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FilterBlockDate;
