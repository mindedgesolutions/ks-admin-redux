import React from "react";
import BtnSpinner from "./BtnSpinner";

const FormBtn = ({ text, isLoading }) => {
  return (
    <button type="button" className="btn btn-success" disabled={isLoading}>
      {isLoading && <BtnSpinner />}
      {text || `Save and continue`}
    </button>
  );
};

export default FormBtn;
