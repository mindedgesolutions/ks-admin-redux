import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { splitErrors } from "../../../../utils/showErrors";
import customFetch from "../../../../utils/customFetch";
import ModalAddNewBank from "./ModalAddNewBank";

const BankRelated = ({ options, dbBankDetails }) => {
  const [bankDetails, setBankDetails] = useState({
    bankName: dbBankDetails.dbBankName || "",
    branchName: dbBankDetails.dbBankBranch || "",
    accountNo: dbBankDetails.dbBankAc || "",
  });
  const [selectedIfsc, setSelectedIfsc] = useState(
    dbBankDetails.dbIfscCode || ""
  );

  const handleInputChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  // Add new bank modal starts ------
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Add new bank modal ends ------

  const handleChange = async (selectedOption) => {
    const newIfsc = selectedOption.value;
    setSelectedIfsc(newIfsc);
    try {
      const data = await customFetch.get(`/master/bank-single/${newIfsc}`);
      const bank = data.data.data.rows[0];
      setBankDetails({
        ...bankDetails,
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
          onChange={handleChange}
          name="ifscCode"
          value={{
            label: selectedIfsc,
            value: selectedIfsc,
          }}
          autoFocus={true}
        />
      </div>
      {/* <div className="col-md-2 col-sm-12">
        <label className="form-label">&nbsp;</label>
        <button
          type="button"
          className="btn btn-success w-full"
          onClick={() => setShow(!show)}
        >
          Add new
        </button>
      </div> */}
      <div className="col-md-6 col-sm-12">
        <label htmlFor="bankName" className="form-label required">
          Bank name
        </label>
        <input
          type="text"
          name="bankName"
          id="bankName"
          className="form-control"
          onChange={handleInputChange}
          value={bankDetails.bankName}
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
          value={bankDetails.branchName}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          value={bankDetails.accountNo}
          className="form-control"
        />
      </div>

      {/* Add new bank modal starts ------ */}

      <ModalAddNewBank show={show} handleClose={handleClose} />

      {/* Add new bank modal ends ------ */}
    </>
  );
};

export default BankRelated;
