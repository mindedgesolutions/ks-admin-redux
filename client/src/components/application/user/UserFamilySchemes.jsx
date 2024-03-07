import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { familySchemeSet } from "../../../features/userApplication/familySlice";

const UserFamilySchemes = () => {
  const dispatch = useDispatch();
  const { schemes } = useSelector((store) => store.schemes);
  const { clearData, fMember, fSchemes } = useSelector((store) => store.family);

  const dbSch = [];
  fMember?.member_schemes?.map((scheme) => {
    const element = { value: scheme.scheme_id, label: scheme.schemes_name };
    dbSch.push(element);
  });

  const [selectedSchemes, setSelectedSchemes] = useState(dbSch || []);

  const sch = [];
  schemes.map((scheme) => {
    const element = { value: scheme.id, label: scheme.schemes_name };
    sch.push(element);
  });

  const options = sch.filter(
    (obj1) => !dbSch.some((obj2) => obj1.label === obj2.label)
  );

  const handleChange = async (selected) => {
    setSelectedSchemes(selected);
    dispatch(familySchemeSet(selected));
  };

  useEffect(() => {
    setSelectedSchemes(null);
  }, [clearData]);

  useEffect(() => {
    setSelectedSchemes(dbSch);
  }, [fMember]);

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

export default UserFamilySchemes;
