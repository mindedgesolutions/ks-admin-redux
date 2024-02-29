import React, { useState } from "react";
import InputText from "../../InputText";
import InputTextarea from "../../InputTextarea";
import { useLoaderData } from "react-router-dom";

const WithoutAgent = () => {
  const info = useLoaderData();
  const [form, setForm] = useState({
    companyName: info?.data?.data?.rows[0]?.employer_name || "",
    companyAddress: info?.data?.data?.rows[0]?.employer_address || "",
    companyMobile: info?.data?.data?.rows[0]?.employer_mobile || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="row row-cards mt-1">
      <div className="col-md-6 col-sm-12">
        <InputText
          label="Employer's / Company name"
          name="companyName"
          required={false}
          value={form.companyName}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <InputTextarea
          label="Employer's / Company address"
          name="companyAddress"
          required={false}
          value={form.companyAddress}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <InputText
          label="Employer's / Company mobile no."
          name="companyMobile"
          required={false}
          value={form.companyMobile}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default WithoutAgent;
