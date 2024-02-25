import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSubdiv,
  getSubdivs,
} from "../features/masters/subdivMasterSlice";
import { nanoid } from "nanoid";

const MasterSubDivs = () => {
  const dispatch = useDispatch();
  const { subDivisions, inputSubdiv } = useSelector((store) => store.subdivs);
  const { inputDist } = useSelector((store) => store.districts);
  console.log(inputDist);

  useEffect(() => {
    dispatch(getSubdivs(inputDist));
  }, [dispatch]);

  const handleSubdivChange = (e) => {
    dispatch(changeSubdiv(e.target.value));
  };

  return (
    <>
      <div className="col-md-12 col-sm-12">
        <label htmlFor="subDiv" className="form-label required">
          Sub-division
        </label>
        <select
          name="subDiv"
          id="subDiv"
          className="form-select"
          value={inputSubdiv}
          onChange={handleSubdivChange}
        >
          <option value="">- Select sub-division -</option>
          {subDivisions?.map((sd) => {
            return (
              <option key={nanoid()} value={sd.subdiv_code}>
                {sd.subdiv_name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default MasterSubDivs;
