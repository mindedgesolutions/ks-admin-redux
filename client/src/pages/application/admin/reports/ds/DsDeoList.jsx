import React from "react";
import { useSelector } from "react-redux";

const DsDeoList = () => {
  const { search } = useSelector((store) => store.reports);
  const searchString = search.toString().substring(1);

  return <div>DsDeoList</div>;
};

export default DsDeoList;
