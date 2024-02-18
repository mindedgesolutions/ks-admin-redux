import React from "react";

const UserInputText = ({
  label,
  name,
  required,
  value,
  handleChange,
  autoFocus,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-control"
        autoFocus={autoFocus}
      />
    </>
  );
};

export default UserInputText;
