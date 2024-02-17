import React, { useState } from "react";
import { religions } from "../../../../utils/data";
import { nanoid } from "nanoid";
import UserInputText from "../UserInputText";

const ReligionRelated = ({ religion, religionOther, emergencyMobile }) => {
  const [form, setForm] = useState({
    religion: religion || "",
    religionOther: religionOther || "",
    emergencyMobile: emergencyMobile || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="col-md-6 col-sm-12">
        <label htmlFor="religion" className="form-label required">
          Religion
        </label>
        <select
          name="religion"
          id="religion"
          className="form-select"
          value={form.religion}
          onChange={handleChange}
        >
          <option value="">- Select -</option>
          {religions.map((religion) => {
            return (
              <option key={nanoid()} value={religion.value}>
                {religion.text}
              </option>
            );
          })}
        </select>
      </div>
      {Number(form.religion) === 9 && (
        <div className="col-md-6 col-sm-12">
          <label htmlFor="religionOther" className="form-label required">
            Enter your religion
          </label>
          <input
            type="text"
            name="religionOther"
            id="religionOther"
            className="form-control"
            value={form.religionOther}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="col-md-6 col-sm-12">
        <UserInputText
          label="Emergency mobile number of family member"
          name="emergencyMobile"
          required={true}
          value={form.emergencyMobile}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default ReligionRelated;
