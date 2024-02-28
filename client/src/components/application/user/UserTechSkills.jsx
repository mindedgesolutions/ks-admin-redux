import { nanoid } from "nanoid";
import React, { useState } from "react";
import { techSkills } from "../../../utils/data";
import InputText from "../../InputText";
import { useLoaderData } from "react-router-dom";

const UserTechSkills = () => {
  const { info } = useLoaderData();
  const [userSkill, setUserSkill] = useState({
    skill: info?.data?.data?.rows[0]?.technical_skill ? "yes" : "no",
    skillDesc: info?.data?.data?.rows[0]?.technical_skill || "",
  });

  const handleChange = (e) => {
    setUserSkill({ ...userSkill, [e.target.name]: e.target.value });
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
                checked={userSkill.skill === option.value}
                onChange={handleChange}
              />
              <span className="form-check-label">{option.text}</span>
            </label>
          );
        })}
      </div>
      {userSkill.skill === "yes" && (
        <div className="col-md-6 col-sm-12">
          <InputText
            label="Skill Description"
            name="skillDesc"
            required={true}
            value={userSkill.skillDesc}
            handleChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

export default UserTechSkills;
