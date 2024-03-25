import React, { useState } from "react";
import {
  applicationStatus,
  blockType,
  originationNames,
  originationTypes,
} from "../../../utils/data";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { getSubdivs, resetSubdiv } from "../../../features/masters/subdivSlice";
import {
  changeBlLabel,
  getBlocks,
  resetBlock,
} from "../../../features/masters/blockSlice";
import InputSelect from "../../InputSelect";

const FilterKsOrigin = ({ resetUrl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const { districts } = useSelector((store) => store.districts);
  const { subdivs } = useSelector((store) => store.msubdivs);
  const { blLabel, blocks } = useSelector((store) => store.mblocks);

  const [form, setForm] = useState({
    inputDist: queryParams.get("dist") || "",
    inputSubdiv: queryParams.get("subdiv") || "",
    inputBlType: queryParams.get("btype") || "",
    inputBlLabel: "",
    inputBlCode: queryParams.get("block") || "",
    inputOrigintype: queryParams.get("otype") || "ALL",
    inputOriginName: queryParams.get("oname") || "ALL",
    status: queryParams.get("status") || "ALL",
  });

  // Change district starts ------
  const handleDistChange = (e) => {
    setForm({
      ...form,
      inputDist: e.target.value,
      inputSubdiv: "",
      inputBlType: "",
      inputBlCode: "",
    });
    dispatch(getSubdivs(e.target.value));
  };

  // Change sub-division starts ------
  const handleSdChange = (e) => {
    setForm({
      ...form,
      inputSubdiv: e.target.value,
      inputBlType: "",
      inputBlCode: "",
    });
    const payload = {
      bltype: form.inputBlType || null,
      sdcode: e.target.value,
    };
    dispatch(getBlocks(payload));
  };

  // Change block type starts ------
  const handleBlTypeChange = (e) => {
    setForm({ ...form, inputBlType: e.target.value });
    const payload = {
      dist: form.inputDist,
      bltype: e.target.value,
      sdcode: form.inputSubdiv,
    };
    dispatch(changeBlLabel(payload));
    dispatch(getBlocks(payload));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Change origination type starts ------
  const handleOriginTypeChange = (e) => {
    setForm({ ...form, inputOrigintype: e.target.value });
  };

  // Reset all states ------
  const handleReset = () => {
    setForm({
      ...form,
      inputDist: "",
      inputSubdiv: "",
      inputBlType: "",
      inputBlLabel: "",
      inputBlCode: "",
      inputOrigintype: "ALL",
      inputOriginName: "ALL",
      status: "ALL",
    });
    dispatch(resetSubdiv());
    dispatch(resetBlock());
    navigate(resetUrl);
  };

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
                  value={form.inputDist}
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
                  value={form.inputSubdiv}
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
                  value={form.inputBlType}
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
                <label htmlFor="block" className="form-label">
                  {blLabel || "Block"}
                </label>
                <select
                  name="block"
                  id="block"
                  className="form-select"
                  value={form.inputBlCode}
                  onChange={(e) =>
                    setForm({ ...form, inputBlCode: e.target.value })
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
              <div className="mb-2 col-sm-3 col-md-3">
                <label htmlFor="otype" className={`form-label`}>
                  Select origination type
                </label>
                <select
                  name="otype"
                  id="otype"
                  className="form-select"
                  value={form.inputOrigintype}
                  onChange={handleOriginTypeChange}
                >
                  <option value="">- Select origination type -</option>
                  {originationTypes.map((type) => {
                    return (
                      <option key={nanoid()} value={type.value}>
                        {type.text}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-2 col-sm-3 col-md-3">
                <label htmlFor="oname" className="form-label">
                  Select origination name
                </label>
                <select
                  name="oname"
                  id="oname"
                  className="form-select"
                  value={form.inputOriginName}
                  onChange={(e) =>
                    setForm({ ...form, inputOriginName: e.target.value })
                  }
                >
                  <option value="">- Select origination name -</option>
                  {originationNames.map((i) => {
                    return (
                      <option key={i.value} value={i.value}>
                        {i.text}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-2 col-sm-3 col-md-3">
                <InputSelect
                  label="Select application status"
                  name="status"
                  required={false}
                  options={applicationStatus}
                  value={form.status}
                  handleChange={handleChange}
                />
              </div>
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

export default FilterKsOrigin;
