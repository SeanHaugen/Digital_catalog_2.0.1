import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Card from "@mui/joy/Card";

function RecentlyViewed({ recentPages }) {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(path);
  };

  const cleanUpPath = (path) => {
    const itemName = decodeURIComponent(path).split("/").pop();
    return itemName.replace(/[^\w\s]/gi, " ");
  };

  console.log(recentPages);
  return (
    <Card>
      {/* {recentPages.map((path, index) => (
        <ul key={index}>
          <li>
            <div>
              <button onClick={() => navigateToPage(path)}>
                {cleanUpPath(path)}
              </button>
            </div>
          </li>
        </ul>
      ))} */}
    </Card>
  );
}

export default RecentlyViewed;
