import { nanoid } from "nanoid";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const FamilyTable = ({ members, confirmDelete, handleEditInfo }) => {
  return (
    <div className="table-responsive fs-5 mx-0 px-0">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th className="bg-dark">No.</th>
            <th className="bg-dark">Name</th>
            <th className="bg-dark">Relation</th>
            <th className="bg-dark">Aadhaar no.</th>
            <th className="bg-dark">EPIC no.</th>
            <th className="bg-dark"></th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member, index) => {
            return (
              <tr key={nanoid()}>
                <td>{index + 1}.</td>
                <td>{member.member_name.toUpperCase()}</td>
                <td>{member.member_relationship.toUpperCase()}</td>
                <td>{member.member_aadhar_no}</td>
                <td>{member.member_epic}</td>
                <td>
                  <FaRegEdit
                    title="Edit"
                    className="me-2 fs-3 text-yellow cursor-pointer"
                    onClick={() => handleEditInfo(member.id)}
                  />
                  <FaRegTrashCan
                    title="Delete"
                    className="ms-1 fs-3 text-danger cursor-pointer"
                    onClick={() => confirmDelete(member.id, member.member_name)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FamilyTable;
