import { nanoid } from "nanoid";
import React from "react";

const UserInputRadio = ({
  label,
  name,
  required,
  options,
  value,
  handleChange,
}) => {
  return (
    <>
      <label className={`form-label mb-3 ${required ? "required" : ""}`}>
        {label}
      </label>
      {options.map((option) => {
        return (
          <label key={nanoid()} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              value={option.value}
              name={name}
              checked={value === option.value}
              onChange={handleChange}
            />
            <span className="form-check-label">{option.text}</span>
          </label>
        );
      })}
    </>
  );
};

export default UserInputRadio;