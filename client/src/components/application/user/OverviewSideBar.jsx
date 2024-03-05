import React from "react";
import Avatar from "../../../assets/dist/images/000m.jpg";
import { useLoaderData } from "react-router-dom";
import { dateFormat, genderFormat } from "../../../utils/functions";

const OverviewSideBar = () => {
  const { info } = useLoaderData();

  return (
    <div className="col-4 d-none d-md-block border-end">
      <div className="card-body px-2">
        <div className="card">
          <div className="card-header p-3">
            <h3 className="card-title">Personal Information</h3>
          </div>
          <div className="card-body p-3">
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="datagrid-title">Name :</label>
                    <label className="form-label">
                      {info.data.data.rows[0].name.toUpperCase()}
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <img
                    src={Avatar}
                    className="avatar avatar-md"
                    alt={import.meta.env.VITE_USER_TITLE}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="datagrid-title">
                Father's / Husband's name :
              </label>
              <label className="form-label">
                {info.data.data.rows[0].father_husband_name.toUpperCase()}
              </label>
            </div>
            <div className="mb-3">
              <label className="datagrid-title">Gender :</label>
              <label className="form-label">
                {genderFormat(info.data.data.rows[0].gender).toUpperCase()}
              </label>
            </div>
            <div className="mb-3">
              <label className="datagrid-title">Date of birth :</label>
              <label className="form-label">
                {dateFormat(info.data.data.rows[0].dob)} (
                {info.data.data.rows[0].age})
              </label>
            </div>
          </div>
          <div className="card-footer text-end">
            <a href="#" className="btn btn-primary">
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSideBar;
