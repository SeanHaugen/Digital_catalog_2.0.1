// src/components/RecentlyViewed.js
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const RecentlyViewed = ({ recentlyViewedItems, setProduct }) => {
  // console.log("Recently Viewed Items:", recentlyViewedItems);

  return (
    <div>
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
