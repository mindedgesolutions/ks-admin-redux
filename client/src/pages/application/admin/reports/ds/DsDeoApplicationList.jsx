import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Main component starts ------
const DsDeoApplicationList = () => {
  const { id, status } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const filter = JSON.parse(localStorage.getItem("filter"));

  return <div>DsDeoApplicationList</div>;
};

export default DsDeoApplicationList;
