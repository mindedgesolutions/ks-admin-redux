import React, { useEffect, useState } from "react";
import { countries } from "../../../../utils/data";
import { nanoid } from "nanoid";
import customFetch from "../../../../utils/customFetch";

const WorksiteCountry = ({ country, countryName, passportNo, stateCode }) => {
  const [selectedCountry, setSelectedCountry] = useState(country || "");
  const [stateList, setStateList] = useState([]);

  const [form, setForm] = useState({
    countryName: countryName || "",
    passportNo: passportNo || "",
    stateCode: stateCode,
  });

  const handleCountryChange = async (e) => {
    const newCountry = e.target ? e.target.value : selectedCountry;
    setSelectedCountry(newCountry);
    if (Number(newCountry) === 1) {
      const { data } = await customFetch.get("/master/states");
      setStateList(data.data.rows);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    handleCountryChange(selectedCountry);
  }, []);

  return (
    <div className="row row-cards mt-3">
      <div className="col-md-6 col-sm-12">
        <label htmlFor="country" className="form-label required">
          Country
        </label>
        <select
          name="country"
          id="country"
          className="form-select"
          onChange={handleCountryChange}
          value={selectedCountry}
        >
          <option value="">- Select country -</option>
          {countries.map((option) => {
            return (
              <option key={nanoid()} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
      </div>

      {Number(selectedCountry) === 1 && (
        <>
          <div className="col-md-6 col-sm-12">
            <label htmlFor="stateCode" className="form-label required">
              Select state
            </label>
            <select
              name="stateCode"
              id="stateCode"
              className="form-select"
              value={form.stateCode}
              onChange={handleChange}
            >
              <option value="">- Select state -</option>
              {stateList.map((state) => {
                return (
                  <option key={nanoid()} value={state.id}>
                    {state.statename}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}

      {Number(selectedCountry) === 2 && (
        <>
          <div className="col-md-6 col-sm-12">
            <label htmlFor="countryName" className="form-label required">
              Enter country name
            </label>
            <input
              type="text"
              name="countryName"
              id="countryName"
              value={form.countryName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <label htmlFor="passportNo" className="form-label required">
              Enter passport no.
            </label>
            <input
              type="text"
              name="passportNo"
              id="passportNo"
              className="form-control"
              value={form.passportNo}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {(Number(selectedCountry) === 3 || Number(selectedCountry) === 4) && (
        <>
          <div className="col-md-6 col-sm-12">
            <label htmlFor="countryName" className="form-label">
              Enter passport no.
            </label>
            <input
              type="text"
              name="passportNo"
              id="passportNo"
              className="form-control"
              value={form.passportNo}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WorksiteCountry;
