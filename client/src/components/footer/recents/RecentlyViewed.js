import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

const RecentlyViewedPages = () => {
  const [recentPages, setRecentPages] = useState([]);
  const location = useLocation();

  const cleanUpPath = (path) => {
    if (!path || path === "/") {
      return "Home";
    }

    const itemName = decodeURIComponent(path).split("/").pop();
    return itemName.replace(/[^\w\s]/gi, " ");
  };

  useEffect(() => {
    const currentItemName = cleanUpPath(location.pathname);

    setRecentPages((prevHistoryList) => {
      const updatedPages = [
        currentItemName,
        ...prevHistoryList.filter((page) => page !== currentItemName),
      ].slice(0, 5);

      localStorage.setItem("recentPages", JSON.stringify(updatedPages));
      return updatedPages;
    });
  }, [location.pathname]);

  return (
    <div>
      <h2>Recently Viewed Pages</h2>
      <ul>
        {recentPages.map((page, index) => (
          <ListItemButton
            key={index}
            component={NavLink}
            to={`/category/subcategory/${page.Name}`}
          >
            {page}
          </ListItemButton>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyViewedPages;
