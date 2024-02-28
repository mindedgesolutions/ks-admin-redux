import React from "react";
import BtnSpinner from "./BtnSpinner";

const SubmitBtn = ({ text, isLoading }) => {
  return (
    <button type="submit" className="btn btn-success" disabled={isLoading}>
      {isLoading && <BtnSpinner />}
      {text || `Save and continue`}
    </button>
  );
};

export default SubmitBtn;
