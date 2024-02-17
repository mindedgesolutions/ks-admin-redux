import React, { useState } from "react";
import UserInputText from "../UserInputText";
import UserInputTextarea from "../UserInputTextarea";

const WithoutAgent = ({ info }) => {
  const { engaged_as, employer_name, employer_address, employer_mobile } = info;
  const [form, setForm] = useState({
    companyName: engaged_as === "Without-agency" ? employer_name : "",
    companyAddress: engaged_as === "Without-agency" ? employer_address : "",
    companyMobile: engaged_as === "Without-agency" ? employer_mobile : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="row row-cards mt-1">
      <div className="col-md-6 col-sm-12">
        <UserInputText
          label="Employer's / Company name"
          name="companyName"
          required={false}
          value={form.companyName}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <UserInputTextarea
          label="Employer's / Company address"
          name="companyAddress"
          required={false}
          value={form.companyAddress}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <UserInputText
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
