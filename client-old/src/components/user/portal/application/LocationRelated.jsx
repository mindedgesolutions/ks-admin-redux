import React, { useState } from "react";
import customFetch from "../../../../utils/customFetch";
import { nanoid } from "nanoid";
import { blockLabel, blockType } from "../../../../utils/data";

const LocationRelated = ({
  districts,
  dbDist,
  dbSubDiv,
  dbBlType,
  dbBlCode,
  dbGp,
  dbPs,
}) => {
  const districtList = districts.data.data.rows;
  const [label, setLabel] = useState("B");
  // console.log(`${dbDist}, ${dbSubDiv}, ${dbBlType}, ${dbBlCode}, ${dbPs}`);

  const [selectedDist, setSelectedDist] = useState(dbDist || "");
  const [selectedSubDiv, setSelectedSubDiv] = useState(dbSubDiv || "");
  const [selectedBlType, setSelectedBlType] = useState(dbBlType || "");
  const [selectedBlCode, setSelectedBlCode] = useState(dbBlCode || "");
  const [selectedWard, setSelectedWard] = useState(dbGp || "");
  const [selectedPs, setSelectedPs] = useState(dbPs || "");

  const [subDivList, setSubDivList] = useState([]);
  const [blockTypeList, setBlockTypeList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [psList, setPsList] = useState([]);

  // District change events start ------
  const handleDistChange = async (e) => {
    const newDist = e.target ? e.target.value : dbDist;
    setSelectedDist(newDist);
    if (newDist) {
      const { data } = await customFetch.get(
        `/master/sub-divisions/${newDist}`
      );
      setSubDivList(data.data.rows);
    } else {
      setSubDivList([]);
      setSelectedSubDiv("");
      setBlockTypeList([]);
      setSelectedBlType("");
      setBlockList([]);
      setSelectedBlCode("");
      setWardList([]);
      setSelectedWard("");
      setPsList([]);
      setSelectedPs("");
    }
  };
  // District change events end ------

  // Sub-division change events start ------
  const handleSubDivChange = async (e) => {
    const newSubDiv = e.target ? e.target.value : dbSubDiv;
    setSelectedSubDiv(newSubDiv);
    if (selectedDist && newSubDiv) {
      setBlockTypeList(blockType);
    } else {
      setBlockTypeList([]);
      setSelectedBlType("");
      setBlockList([]);
      setSelectedBlCode("");
      setWardList([]);
      setSelectedWard("");
    }
  };
  // Sub-division change events end ------

  // Block type change events start ------
  const handleBlTypeChange = async (e) => {
    const newBlType = e.target ? e.target.value : dbBlType;
    setLabel(newBlType);
    setSelectedBlType(newBlType);
    if (selectedSubDiv && newBlType) {
      const { data } = await customFetch.get(
        `/master/blocks/${selectedSubDiv}/${newBlType}`
      );
      setBlockList(data.data.rows);
    } else {
      setBlockList([]);
      setSelectedBlCode("");
      setWardList([]);
      setSelectedWard("");
    }
  };
  // Block type change events end ------

  // Block code change events start ------
  const handleBlCodeChange = async (e) => {
    const newBlCode = e.target ? e.target.value : dbBlCode;
    setSelectedBlCode(newBlCode);
    if (newBlCode) {
      const { data } = await customFetch.get(`/master/wards/${newBlCode}`);
      setWardList(data.data.rows);
    } else {
      setWardList([]);
      setSelectedWard("");
    }
  };
  // Block code change events start ------

  // Ward / GP change events start ------
  const handleWardChange = async (e) => {
    const newWard = e.target ? e.target.value : dbGp;
    setSelectedWard(newWard);
    if (selectedDist && newWard) {
      const { data } = await customFetch.get(`/master/ps/${selectedDist}`);
      setPsList(data.data.rows);
    } else {
      setPsList([]);
      setSelectedPs("");
    }
  };
  // Ward / GP change events end ------

  useState(() => {
    handleDistChange(selectedDist);
    handleSubDivChange(selectedSubDiv);
    handleBlTypeChange(selectedBlType);
    handleBlCodeChange(selectedBlCode);
    handleWardChange(selectedWard);
  }, []);

  return (
    <>
      <div className="col-md-6 col-sm-12">
        <label htmlFor="district" className="form-label required">
          District
        </label>
        <select
          name="district"
          id="district"
          className="form-select"
          value={selectedDist}
          onChange={handleDistChange}
        >
          <option value="">- Select district -</option>
          {districtList.map((district) => {
            return (
              <option key={nanoid()} value={district.district_code}>
                {district.district_name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md-6 col-sm-12">
        <label htmlFor="subDiv" className="form-label required">
          Sub-division
        </label>
        <select
          name="subDiv"
          id="subDiv"
          className="form-select"
          value={selectedSubDiv}
          onChange={handleSubDivChange}
        >
          <option value="">- Select sub-division -</option>
          {subDivList &&
            subDivList.map((subDiv) => {
              return (
                <option key={nanoid()} value={subDiv.subdiv_code}>
                  {subDiv.subdiv_name}
                </option>
              );
            })}
        </select>
      </div>

      <div className="col-md-6 col-sm-12">
        <label htmlFor="blType" className="form-label required">
          Select area type
        </label>
        <select
          name="blType"
          id="blType"
          className="form-select"
          value={selectedBlType}
          onChange={handleBlTypeChange}
        >
          <option value="">- Select area type -</option>
          {blockTypeList.map((type) => {
            return (
              <option key={nanoid()} value={type.value}>
                {type.text}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md-6 col-sm-12">
        <label htmlFor="blCode" className="form-label required">
          {label ? blockLabel(label) : `Block`}
        </label>
        <select
          name="blCode"
          id="blCode"
          className="form-select"
          value={selectedBlCode}
          onChange={handleBlCodeChange}
        >
          <option value="">- Select {blockLabel(label).toLowerCase()} -</option>
          {blockList.map((block) => {
            return (
              <option key={nanoid()} value={block.block_mun_code}>
                {block.block_mun_name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md-6 col-sm-12">
        <label htmlFor="gpCode" className="form-label required">
          Gram Panchayat name
        </label>
        <select
          name="gpCode"
          id="gpCode"
          className="form-select text-capitalize"
          value={selectedWard}
          onChange={handleWardChange}
        >
          <option value="">- Select gram panchayat name -</option>
          {wardList.map((ward) => {
            return (
              <option key={nanoid()} value={ward.village_ward_code}>
                {ward.village_ward_name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md-6 col-sm-12">
        <label htmlFor="psCode" className="form-label required">
          Police Station
        </label>
        <select
          name="psCode"
          id="psCode"
          className="form-select"
          value={selectedPs}
          onChange={(e) => setSelectedPs(e.target.value)}
        >
          <option value="">- Select police station -</option>
          {psList.map((ps) => {
            return (
              <option key={nanoid()} value={ps.ps_code}>
                {ps.ps_name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default LocationRelated;
