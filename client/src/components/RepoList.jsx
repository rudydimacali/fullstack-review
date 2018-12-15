import React from "react";

const RepoList = props => (
  <div>
    There are {props.count} repos in the database. Currently displaying the top{" "}
    {props.repos.length} repos.
  </div>
);

export default RepoList;
