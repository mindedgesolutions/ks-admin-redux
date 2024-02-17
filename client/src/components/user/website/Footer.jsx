import React from "react";
import NICLogo from "../../../assets/images/ssy_nic_logo.png";
import ChildLabour from "../../../assets/images/child_labor.jpg";
import AppIcon from "../../../assets/images/app_icon.png";

const Footer = () => {
  return (
    <footer className="_footer mt-3">
      <div className="container">
        <div className="col-md-9 d-flex">
          <a
            href="http://www.nic.in/"
            target="_blank"
            className="pull-left me-3"
          >
            <img
              src={NICLogo}
              alt="Design By NIC"
              className="float-lg-left float-md-left mr-3 mb-5"
            />
          </a>
          <p>
            All efforts have been made to make the information as accurate as
            possible. Contents of the this site are owned and maintained by the
            Office of the Labour Commissionerate . National Informatics Centre
            (NIC), will not be responsible for any loss to any person caused by
            inaccuracy in the information available on this Website. Any
            discrepancy found may be brought to the notice of the Office of the
            Labour Commissionerate.
          </p>
        </div>

        <div className="col-md-3">
          <a href="https://stopchildlabour.org/" target="_blank">
            <img src={ChildLabour} alt="Child Labor" className="pull-right" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=gov.wblabour.parijayee"
            target="_blank"
          >
            <img src={AppIcon} alt="Child Labor" className="pull-right me-3" />
          </a>
        </div>
      </div>

      <div className="_footer-bottom">
        <div className="container">
          <p>
            <a href="#">Site Map</a> | <a href="#">Disclaimer</a> |{" "}
            <a href="#">Policy</a>
          </p>
          <p className="copyright">
            Copyright © 2023 - <span>Labour Department</span> - All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
