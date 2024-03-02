import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Select from "react-select";
import { newSchemeSet } from "../../../features/userApplication/bankNomineesSlice";

const UserSchemes = () => {
  const dispatch = useDispatch();
  const { schemes, userSchemes } = useLoaderData();

  const dbSch = [];
  userSchemes.data.data.rows.map((scheme) => {
    const element = { value: scheme.scheme_id, label: scheme.schemes_name };
    dbSch.push(element);
  });

  const [selectedSchemes, setSelectedSchemes] = useState(dbSch || []);

  const sch = [];
  schemes.data.data.rows.map((scheme) => {
    const element = { value: scheme.id, label: scheme.schemes_name };
    sch.push(element);
  });

  const options = sch.filter(
    (obj1) => !dbSch.some((obj2) => obj1.label === obj2.label)
  );

  const handleChange = async (selected) => {
    setSelectedSchemes(selected);
    dispatch(newSchemeSet(selected));
  };

  return (
    <div className="col-md-6 col-sm-12">
      <label htmlFor="schemes" className="form-label required">
        Availed schemes
      </label>
      <Select
        id="schemes"
        name="schemes"
        options={options}
        onChange={handleChange}
        value={selectedSchemes}
        isMulti
      />
    </div>
  );
};

export default UserSchemes;
