import { nanoid } from "nanoid";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoFolderOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  showFamilyModal,
  showModal,
  memberInfo,
} from "../../../features/userApplication/familySlice";
import ModalViewFamily from "./ModalViewFamily";

const UserFamilyTable = () => {
  const { fMembers, allFSchemes } = useSelector((store) => store.family);
  const dispatch = useDispatch();

  const getMemberDetails = (id) => {
    const schemes_array = allFSchemes.filter(
      (i) => Number(i.member_id) === Number(id)
    );
    const member = fMembers.find((i) => Number(i.id) === Number(id));
    const newObj = { ...member, schemes_array };
    return newObj;
  };

  const handleEditMember = (value) => {
    const newObj = getMemberDetails(value);
    dispatch(memberInfo(newObj));
  };

  const handleFamilyView = (id) => {
    const newObj = getMemberDetails(id);
    dispatch(memberInfo(newObj));
    dispatch(showFamilyModal());
  };

  return (
    <>
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
                    <IoFolderOutline
                      size={18}
                      className="me-3 text-success cursor-pointer"
                      title="View"
                      onClick={() => handleFamilyView(member.id)}
                    />
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
      <ModalViewFamily />
    </>
  );
};

export default UserFamilyTable;
