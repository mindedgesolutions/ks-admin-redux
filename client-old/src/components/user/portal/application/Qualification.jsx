import React, { useState } from "react";
import UserInputText from "../UserInputText";
import { techSkills } from "../../../../utils/data";
import { nanoid } from "nanoid";

const Qualification = ({ skillDesc }) => {
  const [form, setForm] = useState({
    skill: skillDesc ? 'yes' : 'no',
    skillDesc: skillDesc || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="col-md-6 col-sm-12">
        <label className={`form-label mb-3 required`}>
          Do you have any technical skill?
        </label>
        {techSkills.map((option) => {
          return (
            <label key={nanoid()} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                value={option.value}
                name="skill"
                checked={form.skill === option.value}
                onChange={handleChange}
              />
              <span className="form-check-label">{option.text}</span>
            </label>
          );
        })}
      </div>
      {form.skill === "yes" && (
        <div className="col-md-6 col-sm-12">
          <UserInputText
            label="Skill Description"
            name="skillDesc"
            required={true}
            value={form.skillDesc}
            handleChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

export default Qualification;
