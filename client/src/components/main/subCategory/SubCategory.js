import React from "react";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

function SubCategoryPage({ category, subCategory, item, setProduct }) {
  // console.log(item);

  return (
    <div>
      <h3>{subCategory}</h3>
      {item.map((i, index) => {
        return (
          <div key={index}>
            <ListItemButton
              component={NavLink}
              to={`/${category}/${subCategory}/${i.Name}`}
              onClick={() => setProduct(i.Item_Number)}
            >
              <ListItemText primary={i.Name} secondary={i.Item_Number}>
                {i.Name} - {i.Item_Number}
              </ListItemText>
            </ListItemButton>
          </div>
        );
      })}
    </div>
  );
}
export default SubCategoryPage;
