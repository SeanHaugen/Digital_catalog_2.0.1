import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useFetchCategoryData } from "../../../api/api";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

function CategoriesPage({ category, setSubCategory }) {
  const [productsCategory, setProductsCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFetchCategoryData(setProductsCategory, category);
  // console.log(productsCategory);

  return (
    <>
      <h3
        style={{
          marginTop: "3em",
        }}
      >
        {category}
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
        {productsCategory.map((subCat, index) => {
          return (
            <div key={index}>
              <ListItemButton
                component={NavLink}
                to={`/${category}/${subCat}`}
                onClick={() => setSubCategory(subCat)}
              >
                <div>
                  <img
                    src={`https://placehold.co/200x200/png`}
                    alt={subCat}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />

                  <ListItemText
                    primary={subCat}
                    style={{ textAlign: "center" }}
                  >
                    {subCat}
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

export default CategoriesPage;
