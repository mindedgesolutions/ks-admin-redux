import React, { useState } from "react";
import InputText from "../../InputText";
import InputTextarea from "../../InputTextarea";
import { useLoaderData } from "react-router-dom";

const WithAgent = () => {
  const info = useLoaderData();
  const [form, setForm] = useState({
    empName: info?.data?.data?.rows[0]?.employer_name || "",
    empAddress: info?.data?.data?.rows[0]?.employer_address || "",
    empMobile: info?.data?.data?.rows[0]?.employer_mobile || "",
    agentName: info?.data?.data?.rows[0]?.agency_name || "",
    agentAddress: info?.data?.data?.rows[0]?.agency_address || "",
    agentMobile: info?.data?.data?.rows[0]?.agency_mobile || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="row row-cards mt-1">
      <div className="col-md-6 col-sm-12">
        <InputText
          label="Employer's name"
          name="empName"
          required={false}
          value={form.empName}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <InputTextarea
          label="Employer's address"
          name="empAddress"
          required={false}
          value={form.empAddress}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <InputText
          label="Employer's mobile no."
          name="empMobile"
          required={false}
          value={form.empMobile}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <InputText
          label="Agent's / Others name"
          name="agentName"
          required={true}
          value={form.agentName}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <InputTextarea
          label="Agent's / Others address"
          name="agentAddress"
          required={true}
          value={form.agentAddress}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <InputText
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
