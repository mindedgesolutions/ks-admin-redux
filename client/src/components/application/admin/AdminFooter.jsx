import React from "react";
import { Link } from "react-router-dom";

const AdminFooter = () => {
  return (
    <div className="page-wrapper">
      <footer className="footer footer-transparent d-print-none">
        <div className="container-xl">
          <div className="row text-center align-items-center flex-row-reverse">
            <div className="col-lg-auto ms-lg-auto"></div>
            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
              <ul className="list-inline list-inline-dots mb-0">
                <li className="list-inline-item">
                  Copyright &copy; {new Date().getFullYear()}
                  <Link to="/" target="_blank" className="link-secondary ms-1">
                    KARMASATHI (Parijayee Shramik)
                  </Link>
                  . All rights reserved
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminFooter;
