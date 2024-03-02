import { nanoid } from "nanoid";
import React from "react";

const InputSelect = ({
  label,
  name,
  required,
  options,
  value,
  handleChange,
  placeholder,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        onChange={handleChange}
        value={value}
      >
        <option value="">- Select {placeholder || name} -</option>
        {options.map((option) => {
          return (
            <option key={nanoid()} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default InputSelect;
