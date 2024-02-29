import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import AsyncSelect from "react-select/async";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";

const UserBank = () => {
  const { banks: bankList } = useLoaderData();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    ifscCode: "",
    bankName: "",
    branchName: "",
    accountNo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const options = [];
  bankList.data.data.rows.map((bank) => {
    const bankElement = { value: bank.ifsc_code, label: bank.ifsc_code };
    options.push(bankElement);
  });

  const handleIfscChange = async (selectedOption) => {
    const newIfsc = selectedOption.value;
    try {
      const data = await customFetch.get(`/master/bank-single/${newIfsc}`);
      const bank = data.data.data.rows[0];
      setForm({
        ...form,
        ifscCode: newIfsc,
        bankName: bank.bank_name,
        branchName: bank.branch_name,
      });
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 2000);
  };

  return (
    <>
      <div className="col-md-6 col-sm-12">
        <label htmlFor="ifscCode" className="form-label required">
          IFS code
        </label>
        <AsyncSelect
          loadOptions={loadOptions}
          onChange={handleIfscChange}
          name="ifscCode"
          value={{
            label: form.ifscCode,
            value: form.ifscCode,
          }}
          autoFocus={true}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <label htmlFor="bankName" className="form-label required">
          Bank name
        </label>
        <input
          type="text"
          name="bankName"
          id="bankName"
          className="form-control"
          onChange={handleChange}
          value={form.bankName}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <label htmlFor="branchName" className="form-label required">
          Branch name
        </label>
        <input
          type="text"
          name="branchName"
          id="branchName"
          className="form-control"
          value={form.branchName}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <label htmlFor="accountNo" className="form-label required">
          Account no.
        </label>
        <input
          type="text"
          name="accountNo"
          id="accountNo"
          onChange={handleChange}
          value={form.accountNo}
          className="form-control"
        />
      </div>
    </>
  );
};

export default UserBank;
