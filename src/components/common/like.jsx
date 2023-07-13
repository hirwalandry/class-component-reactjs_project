import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      onClick={onClick}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;