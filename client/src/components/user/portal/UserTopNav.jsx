import React, { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import Avatar from "../../../assets/dist/images/000m.jpg";
import { useUserContext } from "../../../pages/user/portal/UserLayout";

const UserTopNav = () => {
  const { appUser, logoutAppUser } = useUserContext();

  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const theme = newTheme === true ? "dark" : "";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-bs-theme", theme);
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"));
  }, [isDarkTheme]);

  return (
    <header className="navbar navbar-expand-md d-none d-lg-flex d-print-none">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
          aria-controls="navbar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav flex-row order-md-last">
          <div className="d-none d-md-flex">
            {!isDarkTheme ? (
              <BsMoonFill
                className="nav-link px-0 me-2 mt-2 cursor-pointer"
                onClick={toggleTheme}
              />
            ) : (
              <BsSunFill
                className="nav-link px-0 me-2 mt-2 cursor-pointer"
                onClick={toggleTheme}
              />
            )}
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
                className="avatar avatar-sm"
                alt={import.meta.env.APP_USER_TITLE}
              />
              <div className="d-none d-xl-block ps-2">
                <div className="fw-bold">
                  {appUser.name ? appUser.name.toUpperCase() : appUser.mobile}
                </div>
                <div className="mt-1 small text-muted">{appUser.mobile}</div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <button
                type="button"
                className="dropdown-item"
                onClick={logoutAppUser}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default UserTopNav;
