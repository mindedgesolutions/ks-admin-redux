import React from "react";
import {
  TbUser,
  TbBuildingFactory2,
  TbUsers,
  TbCurrencyRupee,
  TbFolderUp,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../../../features/userApplication/overViewSlice";

const OverviewTabList = () => {
  const dispatch = useDispatch();
  const { currentTab } = useSelector((store) => store.overview);

  return (
    <div className="card-header">
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${currentTab === "personal" ? "active" : ""}`}
            onClick={() => dispatch(setCurrentTab("personal"))}
          >
            <TbUser size={14} className="me-1" />
            Personal Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${currentTab === "worksite" ? "active" : ""}`}
            onClick={() => dispatch(setCurrentTab("worksite"))}
          >
            <TbBuildingFactory2 size={14} className="me-1" />
            Worksite Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${currentTab === "bank" ? "active" : ""}`}
            onClick={() => dispatch(setCurrentTab("bank"))}
          >
            <TbCurrencyRupee size={14} className="me-1" />
            Bank & Nominee
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${currentTab === "family" ? "active" : ""}`}
            onClick={() => dispatch(setCurrentTab("family"))}
          >
            <TbUsers size={14} className="me-1" />
            Family Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${currentTab === "documents" ? "active" : ""}`}
            onClick={() => dispatch(setCurrentTab("documents"))}
          >
            <TbFolderUp size={14} className="me-1" />
            Documents
          </button>
        </li>
      </ul>
    </div>
  );
};

export default OverviewTabList;
