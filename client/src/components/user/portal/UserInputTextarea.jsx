import React from "react";

const UserInputTextarea = ({
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
      <textarea
        name={name}
        id={name}
        className="form-control"
        cols="30"
        rows="2"
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
      ></textarea>
    </>
  );
};

export default UserInputTextarea;
