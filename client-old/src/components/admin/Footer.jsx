import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ms-lg-auto"></div>

          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Copyright &copy; {new Date().getFullYear()}{" "}
                {import.meta.env.VITE_ADMIN_TITLE_FOOTER}. All rights reserved
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
