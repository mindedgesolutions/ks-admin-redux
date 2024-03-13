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

      <div className="table-responsive fs-5 mx-0 px-0">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th className="bg-dark">Sl. No.</th>
              <th className="bg-dark">Name</th>
              <th className="bg-dark">Gender</th>
              <th className="bg-dark">Age</th>
              <th className="bg-dark">Relation</th>
              <th className="bg-dark">Aadhaar no.</th>
              <th className="bg-dark">EPIC no.</th>
              <th className="bg-dark">Schemes</th>
            </tr>
          </thead>
          <tbody>
            {members.data.response.data.rows.map((i, index) => {
              const schemes = members.data.response.meta.rows.filter(
                (m) => Number(m.member_id) === Number(i.id)
              );

              return (
                <tr key={nanoid()}>
                  <td>{index + 1}.</td>
                  <td>{i.member_name.toUpperCase()}</td>
                  <td>{genderFormat(i.member_gender).toUpperCase()}</td>
                  <td>{i.member_age}</td>
                  <td>{i.member_relationship.toUpperCase()}</td>
                  <td>{i.member_aadhar_no}</td>
                  <td>{i.member_epic || "NA"}</td>
                  <td>
                    {schemes.map((s) => {
                      return (
                        <div key={nanoid()}>
                          <span
                            className={`badge bg-${randomBadgeBg()}-lt p-1 me-1 my-0`}
                          >
                            {s?.schemes_name?.toUpperCase()}
                          </span>
                          <br />
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFamily;
