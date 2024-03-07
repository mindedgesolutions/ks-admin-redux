import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

const UserWorksite = () => {
  const { info } = useLoaderData();
  const { countries } = useSelector((store) => store.countries);
  const { states } = useSelector((store) => store.states);

  const [loc, setLoc] = useState({
    country: info?.data?.data?.rows[0]?.present_country || "",
    stateCode: info?.data?.data?.rows[0]?.present_state || "",
    passportNo: info?.data?.data?.rows[0]?.passport_no || "",
  });

  const handleLocChange = (e) => {
    setLoc({ ...loc, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="row row-cards mt-0">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="country" className="form-label required">
            Country
          </label>
          <select
            name="country"
            id="country"
            className="form-select"
            onChange={handleLocChange}
            value={loc.country}
          >
            <option value="">- Select country -</option>
            {countries.map((option) => {
              return (
                <option key={nanoid()} value={option.id}>
                  {option.country_name}
                </option>
              );
            })}
          </select>
        </div>

        {Number(loc.country) === 1 && (
          <div className="col-md-6 col-sm-12">
            <label htmlFor="stateCode" className="form-label required">
              State
            </label>
            <select
              name="stateCode"
              id="stateCode"
              className="form-select"
              onChange={handleLocChange}
              value={loc.stateCode}
            >
              <option value="">- Select state -</option>
              {states.map((state) => {
                return (
                  <option key={nanoid()} value={state.id}>
                    {state.statename}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {loc.country && Number(loc.country) !== 1 && (
          <div className="col-md-6 col-sm-12">
            <label
              htmlFor="passportNo"
              className={`form-label ${
                Number(loc.country) === 3 || Number(loc.country) === 4
                  ? ""
                  : "required"
              }`}
            >
              Enter passport no.
            </label>
            <input
              type="text"
              name="passportNo"
              id="passportNo"
              className="form-control"
              value={loc.passportNo}
              onChange={handleLocChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserWorksite;
