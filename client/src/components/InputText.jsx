import React from "react";

const InputText = ({
  type,
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
        type={type || "text"}
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

export default InputText;
