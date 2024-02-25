import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDist,
  getDistricts,
} from "../features/masters/districtMasterSlice";
import { nanoid } from "nanoid";
import { getSubdivs } from "../features/masters/subdivMasterSlice";

const MasterDistricts = () => {
  const dispatch = useDispatch();
  const { districts, inputDist } = useSelector((store) => store.districts);

  useEffect(() => {
    dispatch(getDistricts());
  }, [dispatch]);

  const handleDistChange = (e) => {
    dispatch(changeDist(e.target.value));
    dispatch(getSubdivs(e.target.value));
  };

  return (
    <>
      <div className="col-md-12 col-sm-12">
        <label htmlFor="district" className="form-label required">
          District
        </label>
        <select
          name="district"
          id="district"
          className="form-select"
          value={inputDist}
          onChange={handleDistChange}
        >
          <option value="">- Select district -</option>
          {districts.map((dist) => {
            return (
              <option key={nanoid()} value={dist.district_code}>
                {dist.district_name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default MasterDistricts;
