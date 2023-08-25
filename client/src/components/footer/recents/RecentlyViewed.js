import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function RecentlyViewed({ productData }) {
  const [recentPages, setRecentPages] = useState([]);
  const history = useLocation();
  useEffect(() => {
    setRecentPages((prevPages) => [history.pathname, ...prevPages.slice(0)]);
  }, [history]);

  const navigate = useNavigate();

  console.log(history);
  // console.log(recentPages);

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <div>
      {recentPages.map((path, index) => (
        <ul key={index}>
          <li>
            <div>
              <button onClick={() => navigateToPage(path)}>{path}</button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default RecentlyViewed;
