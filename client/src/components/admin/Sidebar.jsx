import React from "react";
import Logo from "../../assets/dist/images/inverse-logo.png";
import Avatar from "../../assets/dist/images/000m.jpg";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineFile,
} from "react-icons/ai";
import { BsFillMoonFill, BsSunFill, BsGraphUpArrow } from "react-icons/bs";
import { GoPackage } from "react-icons/go";

const Sidebar = () => {
  return (
    <aside
      className="navbar navbar-vertical navbar-expand-lg"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <h1 className="navbar-brand navbar-brand-autodark">
          <Link to="/admin/dashboard">
            <img
              src={Logo}
              style={{ height: "40px" }}
              alt={import.meta.env.VITE_ADMIN_TITLE}
              // className="navbar-brand-image"
            />
          </Link>
        </h1>
        <div className="navbar-nav flex-row d-lg-none">
          <div className="nav-item d-none d-lg-flex me-3">
            <div className="btn-list">
              <a
                href="https://github.com/tabler/tabler"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                {/* <!-- Download SVG icon from http://tabler-icons.io/i/brand-github --> */}
                <AiFillGithub />
                Source code
              </a>
              <a
                href="https://github.com/sponsors/codecalm"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                {/* <!-- Download SVG icon from http://tabler-icons.io/i/heart --> */}
                <AiOutlineHeart />
                Sponsor
              </a>
            </div>
          </div>

          <div className="d-none d-lg-flex">
            {/* <!-- Download SVG icon from http://tabler-icons.io/i/moon --> */}
            <BsFillMoonFill className="nav-link px-0 hide-theme-dark cursor-pointer" />
            {/* <!-- Download SVG icon from http://tabler-icons.io/i/sun --> */}
            <BsSunFill className="nav-link px-0 hide-theme-light cursor-pointer" />
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <img
                src={Avatar}
                className="avatar avatar-sm cursor-pointer"
                alt="karmasathi"
              />
              <div className="d-none d-xl-block ps-2">
                <div>Pawel Kuna</div>
                <div className="mt-1 small text-muted">UI Designer</div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="#" className="dropdown-item">
                Status
              </a>
              <a href="./profile.html" className="dropdown-item">
                Profile
              </a>
              <a href="#" className="dropdown-item">
                Feedback
              </a>
              <div className="dropdown-divider"></div>
              <a href="./settings.html" className="dropdown-item">
                Settings
              </a>
              <a href="./sign-in.html" className="dropdown-item">
                Logout
              </a>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="sidebar-menu">
          <ul className="navbar-nav pt-lg-3">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  {/* <!-- Download SVG icon from http://tabler-icons.io/i/home --> */}
                  <AiOutlineHome size={18} />
                </span>
                <span className="nav-link-title">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/applications?status=approved"
              >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  {/* <!-- Download SVG icon from http://tabler-icons.io/i/home --> */}
                  <AiOutlineFile size={18} />
                </span>
                <span className="nav-link-title">Applications</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/reports">
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  {/* <!-- Download SVG icon from http://tabler-icons.io/i/home --> */}
                  <BsGraphUpArrow size={16} />
                </span>
                <span className="nav-link-title">Reports</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#navbar-base"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  {/* <!-- Download SVG icon from http://tabler-icons.io/i/package --> */}
                  <GoPackage />
                </span>
                <span className="nav-link-title">Interface</span>
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <div className="dropend">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#sidebar-cards"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="false"
                        role="button"
                        aria-expanded="false"
                      >
                        Cards
                      </a>
                      <div className="dropdown-menu">
                        <a href="./cards.html" className="dropdown-item">
                          Sample cards
                        </a>
                        <a href="./card-actions.html" className="dropdown-item">
                          Card actions
                        </a>
                        <a
                          href="./cards-masonry.html"
                          className="dropdown-item"
                        >
                          Cards Masonry
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
