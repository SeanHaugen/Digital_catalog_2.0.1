import React from "react";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

function NewWindowButton({ linkUrl }) {
  const openLinkInNewWindow = () => {
    window.open(linkUrl, "_blank", "width=800,height=600");
  };

  return (
    <MenuItem>
      {/* <a href={linkUrl} target="_blank" rel="noopener noreferrer"></a> */}

      <NavLink to={linkUrl} target="_blank" rel="noopener noreferrer">
        Open New Window
      </NavLink>
    </MenuItem>
  );
}

export default NewWindowButton;
