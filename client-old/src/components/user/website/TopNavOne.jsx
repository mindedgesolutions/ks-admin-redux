import React from "react";
import FlagIndia from "../../../assets/dist/images/website/flag-india.jpg";

const TopNavOne = () => {
  return (
    <div className="header-top">
      <div className="container">
        <div className="row">
          <div className="col-4 mt-1">
            <img src={FlagIndia} className="img-fluid" />
            <span className="ms-2">Government of West Bengal</span>
          </div>

          <div className="col-8 pull-right">
            <ul className="top-nav-skip-cnt">
              <li>
                <a href="#" target="_self">
                  Skip to main content
                </a>
              </li>

              <li className="language">
                <a href="#" className="icon"></a>
                <div className="language-btm">
                  <a href="#">English</a>
                  <a href="#">বাংলা</a>
                  <a href="#">हिंदी</a>
                  <a href="#">اردو</a>
                </div>
              </li>

              <li className="text">
                <a className="icon" href="#"></a>
                <div className="text-btm">
                  <a href="#">
                    A<sup>-</sup>
                  </a>
                  <a href="#">A</a>
                  <a href="#">
                    A<sup>+</sup>
                  </a>
                  <a href="#" className="dark">
                    A
                  </a>
                  <a href="#" className="normal">
                    A
                  </a>
                </div>
              </li>

              <li>
                <a className="screen-reader" title="Screen Reader"></a>
              </li>

              <li>
                <a className="media" title="Media"></a>
              </li>

              <li>
                <a
                  className="play-store"
                  href="https://play.google.com/store/apps/details?id=gov.wblabour.parijayee&pli=1"
                  target="_blank"
                  title="Play Store"
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavOne;
