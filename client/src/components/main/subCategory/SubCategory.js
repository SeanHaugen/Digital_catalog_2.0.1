import React from "react";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

function SubCategoryPage({ category, subCategory, item, setProduct }) {
  // console.log(item);

  return (
    <>
      <h3
        style={{
          marginTop: "3em",
        }}
      >
        {subCategory}
      </h3>

      <div
        style={{
          marginTop: "3em",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1em",
          textAlign: "center",
        }}
      >
        {item.map((i, index) => {
          return (
            <div key={index}>
              <ListItemButton
                component={NavLink}
                to={`/${category}/${subCategory}/${i.Name}`}
                onClick={() => setProduct(i.Item_Number)}
              >
                <div>
                  <img
                    src={`https://placehold.co/200x200/png`}
                    alt="item"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <ListItemText primary={i.Name} secondary={i.Item_Number}>
                    {i.Name} - {i.Item_Number}
                  </ListItemText>
                </div>
              </ListItemButton>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default SubCategoryPage;
