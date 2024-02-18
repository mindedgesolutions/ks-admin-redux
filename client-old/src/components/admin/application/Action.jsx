import React from "react";

const Action = () => {
  return (
    <div className="col-md-3 d-md-block border-end">
      <div className="card-body px-2">
        <h4 className="subheader">Take action</h4>
        <div className="mb-3">
          <label htmlFor="" className="mb-1">
            Action
          </label>
          <select name="" id="" className="form-control">
            <option value="">- Select -</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="">Remarks</label>
          <textarea
            className="form-control"
            name=""
            id=""
            cols="30"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Action;
