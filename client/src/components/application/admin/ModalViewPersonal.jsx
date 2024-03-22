import React from "react";
import { useSelector } from "react-redux";
import { qualificationList } from "../../../utils/data";

const ModalViewPersonal = ({ activeTab }) => {
  const { deoAppDetails, religions } = useSelector((store) => store.deo);
  const { districts } = useSelector((store) => store.districts);

  let gender, religion;
  switch (deoAppDetails?.gender) {
    case "M":
      gender = `MALE`;
      break;
    case "F":
      gender = `FEMALE`;
      break;
    case "O":
      gender = `OTHER`;
      break;
  }

  if (deoAppDetails.religion) {
    const data = religions.find((c) => c.id === Number(deoAppDetails.religion));
    religion = data.religion_name.toUpperCase();
  } else {
    religion = deoAppDetails.religion_other;
  }

  const qualification = qualificationList.find(
    (c) => c.value === deoAppDetails.qualification
  );

  const district = districts
    .find((c) => c.district_code === Number(deoAppDetails.permanent_dist))
    ?.district_name?.toUpperCase();

  return (
    <div
      className={`tab-pane ${activeTab === "personal" ? "active show" : ""}`}
    >
      <div className="row row-cards m-0 p-0">
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Category : </label>
          <label className="form-label m-0 p-0">{deoAppDetails?.caste}</label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Religion : </label>
          <label className="form-label m-0 p-0">{religion}</label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Emergency mobile number of family member :{" "}
          </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.emergency_contact_no}
          </label>
        </div>
      </div>
      <div className="row row-cards m-0 p-0">
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Aadhaar number : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.aadhar_no}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">EPIC number : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.epic_no || "NA"}
          </label>
        </div>
        <div className="mb-3 col-md-12 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Present address : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.permanent_address || "NA"}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">District : </label>
          <label className="form-label m-0 p-0">{district}</label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Sub-division : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.subdiv_name?.toUpperCase()}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Block / Municipality :{" "}
          </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.block_mun_name?.toUpperCase()}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">
            Gram Panchayat name :{" "}
          </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.village_ward_name?.toUpperCase()}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Police station : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.ps_name?.toUpperCase()}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">PIN code : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.permanent_pin}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Qualification : </label>
          <label className="form-label m-0 p-0">
            {qualification?.text?.toUpperCase() || `NA`}
          </label>
        </div>
        <div className="mb-3 col-md-6 m-0 p-0">
          <label className="datagrid-title m-0 p-0">Technical skills : </label>
          <label className="form-label m-0 p-0">
            {deoAppDetails?.technical_skill?.toUpperCase() || `NA`}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalViewPersonal;
