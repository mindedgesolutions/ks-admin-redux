import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ApplicationError = () => {
  return (
    <div class="container-tight py-4">
      <div class="empty">
        <div class="empty-header">Oops!!</div>
        <p class="empty-title">
          Something went wrong! You just found an error page
        </p>
        <p class="empty-subtitle text-muted">
          We are sorry but the page you are looking for was not found
        </p>
        <div class="empty-action">
          <Link className="btn btn-danger" to="./dashboard">
            <FaArrowLeftLong className="me-2" />
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationError;
