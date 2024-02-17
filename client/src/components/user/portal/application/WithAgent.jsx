import React, { useState } from "react";
import UserInputText from "../UserInputText";
import UserInputTextarea from "../UserInputTextarea";

const WithAgent = ({ info }) => {
  const {
    engaged_as,
    agency_name,
    agency_address,
    agency_mobile,
    employer_name,
    employer_address,
    employer_mobile,
  } = info;

  const [form, setForm] = useState({
    empName: engaged_as === "Agency" ? employer_name : "",
    empAddress: engaged_as === "Agency" ? employer_address : "",
    empMobile: engaged_as === "Agency" ? employer_mobile : "",
    agentName: engaged_as === "Agency" ? agency_name : "",
    agentAddress: engaged_as === "Agency" ? agency_address : "",
    agentMobile: engaged_as === "Agency" ? agency_mobile : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="row row-cards mt-1">
      <div className="col-md-6 col-sm-12">
        <UserInputText
          label="Employer's name"
          name="empName"
          required={false}
          value={form.empName}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <UserInputTextarea
          label="Employer's address"
          name="empAddress"
          required={false}
          value={form.empAddress}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <UserInputText
          label="Employer's mobile no."
          name="empMobile"
          required={false}
          value={form.empMobile}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <UserInputText
          label="Agent's / Others name"
          name="agentName"
          required={true}
          value={form.agentName}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <UserInputTextarea
          label="Agent's / Others address"
          name="agentAddress"
          required={true}
          value={form.agentAddress}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <UserInputText
          label="Agent's/ Others mobile no."
          name="agentMobile"
          required={true}
          value={form.agentMobile}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default WithAgent;
