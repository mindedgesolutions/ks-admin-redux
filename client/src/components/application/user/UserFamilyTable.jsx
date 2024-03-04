import { nanoid } from "nanoid";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditDetails,
  showModal,
} from "../../../features/userApplication/familySlice";

const UserFamilyTable = () => {
  const { fMembers } = useSelector((store) => store.family);
  const dispatch = useDispatch();

  const handleEditMember = (value) => {
    dispatch(getEditDetails(value));
  };

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
          {fMembers.map((member, index) => {
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
                    onClick={() => handleEditMember(member.id)}
                  />
                  <FaRegTrashCan
                    title="Delete"
                    className="ms-1 fs-3 text-danger cursor-pointer"
                    onClick={() =>
                      dispatch(
                        showModal({ id: member.id, name: member.member_name })
                      )
                    }
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

export default UserFamilyTable;
