// src/components/RecentlyViewed.js
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";

const RecentlyViewed = ({ recentlyViewedItems, setProduct }) => {
  console.log("Recently Viewed Items:", recentlyViewedItems);

  return (
    <div>
      <h2>Recently Viewed</h2>
      <ul>
        {recentlyViewedItems.map((item, index) => (
          <div>
            <ListItemButton
              key={index}
              component={NavLink}
              to={`/category/subcategory/${item.Item_Number}`}
              onClick={() => setProduct(item.Item_Number)}
            >
              {item.Name}: {item.Item_Number}
            </ListItemButton>
          </div>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recentlyViewedItems: state,
});

export default connect(mapStateToProps)(RecentlyViewed);
