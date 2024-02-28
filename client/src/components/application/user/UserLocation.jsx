import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { getSubdivs } from "../../../features/masters/subdivSlice";
import { blockType } from "../../../utils/data";
import { changeBlLabel, getBlocks } from "../../../features/masters/blockSlice";
import { getGpWards } from "../../../features/masters/gpSlice";
import { getPsList } from "../../../features/masters/psSlice";

const UserLocation = () => {
  const dispatch = useDispatch();
  const { info, districts } = useLoaderData();

  // State management starts ------
  const [loc, setLoc] = useState({
    inputDist: info?.data?.data?.rows[0]?.permanent_dist || "",
    inputSubdiv: info?.data?.data?.rows[0]?.permanent_subdivision || "",
    inputBlType: info?.data?.data?.rows[0]?.permanent_areatype.trim() || "",
    inputBlLabel: "",
    inputBlCode: info?.data?.data?.rows[0]?.permanent_areacode || "",
    inputGp: info?.data?.data?.rows[0]?.permanent_villward || "",
    inputPs: info?.data?.data?.rows[0]?.permanent_ps || "",
  });

  // Redux hooks start ------
  const { subdivs } = useSelector((store) => store.msubdivs);
  const { blLabel, blocks } = useSelector((store) => store.mblocks);
  const { gpWards } = useSelector((store) => store.mgps);
  const { psList } = useSelector((store) => store.mps);

  // Change district starts ------
  const handleDistChange = (e) => {
    setLoc({ ...loc, inputDist: e.target.value });
    dispatch(getSubdivs(e.target.value));
    dispatch(getPsList(e.target.value));
  };

  // Change sub-division starts ------
  const handleSdChange = (e) => {
    setLoc({ ...loc, inputSubdiv: e.target.value });
    const payload = {
      bltype: loc.inputBlType || null,
      sdcode: e.target.value,
    };
    dispatch(getBlocks(payload));
  };

  // Change block type starts ------
  const handleBlTypeChange = (e) => {
    setLoc({ ...loc, inputBlType: e.target.value });
    const payload = {
      bltype: e.target.value,
      sdcode: loc.inputSubdiv,
    };
    dispatch(changeBlLabel(payload));
    dispatch(getBlocks(payload));
  };

  // Change block code starts ------
  const handleBlChange = (e) => {
    setLoc({ ...loc, inputBlCode: e.target.value });
    dispatch(getGpWards(e.target.value));
  };

  // Change village / ward starts ------
  const handleGpChange = (e) => {
    setLoc({ ...loc, inputGp: e.target.value });
  };

  // UseEffect / on load data fetch starts ------
  useEffect(() => {
    loc.inputDist && dispatch(getSubdivs(loc.inputDist));
    if (loc.inputBlType && loc.inputSubdiv) {
      dispatch(
        changeBlLabel({ bltype: loc.inputBlType, sdcode: loc.inputSubdiv })
      );
      dispatch(getBlocks({ bltype: loc.inputBlType, sdcode: loc.inputSubdiv }));
    }
    loc.inputBlCode && dispatch(getGpWards(loc.inputBlCode));
    loc.inputDist && dispatch(getPsList(loc.inputDist));
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
          value={loc.inputDist}
          onChange={handleDistChange}
        >
          <option value="">- Select district -</option>
          {districts.data.data.rows.map((district) => {
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
          value={loc.inputSubdiv}
          onChange={handleSdChange}
        >
          <option value="">- Select sub-division -</option>
          {subdivs.map((value) => {
            return (
              <option key={value.subdiv_code} value={value.subdiv_code}>
                {value.subdiv_name}
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
          value={loc.inputBlType}
          onChange={handleBlTypeChange}
        >
          <option value="">- Select area type -</option>
          {blockType.map((type) => {
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
          {blLabel || "Block"}
        </label>
        <select
          name="blCode"
          id="blCode"
          className="form-select"
          value={loc.inputBlCode}
          onChange={handleBlChange}
        >
          <option value="">
            - Select {blLabel.toLowerCase() || "block"} -
          </option>
          {blocks.map((block) => {
            return (
              <option key={block.block_mun_code} value={block.block_mun_code}>
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
          className="form-select"
          value={loc.inputGp}
          onChange={handleGpChange}
        >
          <option value="">- Select gram panchayat name -</option>
          {gpWards.map((gp) => {
            return (
              <option key={gp.village_ward_code} value={gp.village_ward_code}>
                {gp.village_ward_name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-md-6 col-sm-12">
        <label htmlFor="psCode" className="form-label required">
          Police station
        </label>
        <select
          name="psCode"
          id="psCode"
          className="form-select"
          value={loc.inputPs}
          onChange={(e) => setLoc({ ...loc, inputPs: e.target.value })}
        >
          <option value="">- Select police station -</option>
          {psList.map((p) => {
            return (
              <option key={p.ps_code} value={p.ps_code}>
                {p.ps_name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default UserLocation;
