import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Logout</div>
      <Link to="/login">Logged Out</Link>
    </>
  );
};

export default Logout;
