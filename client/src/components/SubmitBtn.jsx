import React from "react";
import BtnSpinner from "./BtnSpinner";

const SubmitBtn = ({ isIdle, text }) => {
  return (
    <button type="submit" className="btn btn-success" disabled={isIdle}>
      {isIdle && <BtnSpinner />}
      {text || `Save and continue`}
    </button>
  );
};

export default SubmitBtn;
