import React from "react";
import { UserPageHeader, UserPageWrapper } from "../../../components";
import WelcomeBg from "../../../assets/welcome-bg.jpg";
import { useSelector } from "react-redux";
import { applicationStatus, dateFormatFancy } from "../../../utils/functions";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      <UserPageHeader title="Dashboard" />
      <UserPageWrapper>
        <div className="col-lg-8">
          <div className="card">
            <div className="row row-0">
              <div className="col-3">
                <img
                  src={WelcomeBg}
                  className="w-100 h-100 object-cover card-img-start"
                  alt={import.meta.env.VITE_USER_TITLE}
                />
              </div>
              <div className="col">
                <div className="card-body">
                  <h1 className="fst-italic mt-1 text-success fw-light">
                    Welcome
                  </h1>
                  <h1 className="fst-italic mt-1 fw-bold text-uppercase">
                    {user.name}
                  </h1>
                  <h3 className="fst-italic mt-1 fw-normal">
                    MW identification number: {user.identification_number} (
                    {user.status})
                  </h3>
                  <h3 className="fst-italic mt-1 fw-normal">
                    Registered mobile no: {user.mobile}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="row row-0">
              <h1>&nbsp;</h1>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="row g-0">
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap">
                <thead>
                  <tr>
                    <th>MWIN</th>
                    <th>Application</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="text-secondary">
                        {user.identification_number}
                      </span>
                    </td>
                    <td>Migrant worker registration</td>
                    <td>{dateFormatFancy(user.created_date)}</td>
                    <td>{applicationStatus(user.status)}</td>
                    <td className="text-end">
                      <Link to="/user/bank-nominee-info">
                        <button
                          type="button"
                          className="btn btn-md btn-success"
                        >
                          Incomplete Application
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default UserDashboard;
