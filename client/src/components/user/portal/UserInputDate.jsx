import React from "react";

const UserInputDate = ({ label, name, required, value, handleChange }) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
      <input
        type="date"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-control"
      />
    </>
  );
};

export default UserInputDate;
