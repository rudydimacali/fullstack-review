import React from "react";

const RepoList = props => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.count} repos. Currently displaying the top{" "}
    {props.repos.length} repos.
  </div>
);

export default RepoList;
