import { nanoid } from "nanoid";
import React from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { genderFormat, randomBadgeBg } from "../../../utils/functions";

const ViewFamily = () => {
  const { currentTab } = useSelector((store) => store.overview);
  const { members } = useLoaderData();

  return (
    <div className={`tab-pane ${currentTab === "family" ? "active show" : ""}`}>
      <div className="row row-cards mb-3">
        <div className="col-md-8 col-sm-12"></div>
        <div className="col-md-4 col-sm-12">
          <Link
            to="/user/family-info"
            className="btn btn-yellow btn-sm px-2 py-1 float-end"
          >
            <MdEdit className="me-1" /> Edit
          </Link>
        </div>
      </div>
      <div className="row row-cards">
        {members.data.response.data.rows.map((i) => {
          const schemes = members.data.response.meta.rows.filter(
            (m) => Number(m.member_id) === Number(i.id)
          );
          return (
            <div key={nanoid()} className="col-md-8 col-sm-12">
              <div className="card">
                <div className="row row-0">
                  <div className="card-body p-2">
                    <h3 className="card-title">{i.member_name}</h3>
                    <div className="row row-cards">
                      <div className="col-md-4 col-sm-12 my-1">
                        <label className="datagrid-title">Gender :</label>
                        <label className="form-label">
                          {genderFormat(i.member_gender).toUpperCase()}
                        </label>
                      </div>
                      <div className="col-md-4 col-sm-12 my-1">
                        <label className="datagrid-title">Age :</label>
                        <label className="form-label">{i.member_age}</label>
                      </div>
                    </div>
                    <div className="row row-cards">
                      <div className="col-md-4 col-sm-12 my-1">
                        <label className="datagrid-title">Relationship :</label>
                        <label className="form-label">
                          {i.member_relationship.toUpperCase()}
                        </label>
                      </div>
                      <div className="col-md-4 col-sm-12 my-1">
                        <label className="datagrid-title">Aadhaar no. :</label>
                        <label className="form-label">
                          {i.member_aadhar_no}
                        </label>
                      </div>
                    </div>
                    <div className="row row-cards">
                      <div className="col-md-12 col-sm-12 my-1">
                        <label className="datagrid-title">
                          Availed schemes :
                        </label>
                      </div>
                      <div className="col-md-12 col-sm-12 my-0">
                        {schemes.map((s) => {
                          return (
                            <span
                              key={nanoid()}
                              className={`badge bg-${randomBadgeBg()}-lt p-2 me-2 my-1`}
                            >
                              {s?.schemes_name?.toUpperCase()}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewFamily;
