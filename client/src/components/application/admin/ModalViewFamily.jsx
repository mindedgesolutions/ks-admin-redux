import { nanoid } from "nanoid";
import React from "react";
import { useSelector } from "react-redux";

const ModalViewFamily = ({ activeTab }) => {
  const { deoAppDetails } = useSelector((store) => store.deo);

  return (
    <div className={`tab-pane ${activeTab === "family" ? "active show" : ""}`}>
      <div className="table-responsive m-0 p-0">
        <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5 m-0 p-0">
          <thead>
            <tr>
              <th className="bg-dark text-white">Sl. No.</th>
              <th className="bg-dark text-white">Name</th>
              <th className="bg-dark text-white">Gender</th>
              <th className="bg-dark text-white">Age</th>
              <th className="bg-dark text-white">Relation</th>
              <th className="bg-dark text-white">Aadhaar</th>
              <th className="bg-dark text-white"></th>
            </tr>
          </thead>
          <tbody>
            {deoAppDetails?.family_details?.[0]?.member_name ? (
              deoAppDetails?.family_details?.map((member, index) => {
                return (
                  <tr key={nanoid()}>
                    <td>{index + 1}.</td>
                    <td>{member?.member_name?.toUpperCase()}</td>
                    <td>
                      {member?.member_gender === `M`
                        ? `MALE`
                        : member.member_gender === `F`
                        ? `FEMALE`
                        : `OTHER`}
                    </td>
                    <td>{member?.member_age}</td>
                    <td>{member?.member_relationship}</td>
                    <td>{member?.member_aadhar_no}</td>
                    <td></td>
                  </tr>
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={8} className="text-center">
                    NO DATA FOUND
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalViewFamily;

// {deoAppDetails?.family_details?.map((i) => {
//         console.log(i);
//       })}
