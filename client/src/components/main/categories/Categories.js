import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useFetchCategoryData } from "../../../api/api";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

function CategoriesPage({ category, setSubCategory }) {
  const [productsCategory, setProductsCategory] = useState([]);

  useFetchCategoryData(setProductsCategory, category);

  return (
    <div>
      <h4>{category}</h4>
      {productsCategory.map((subCat, index) => {
        return (
          <div key={index}>
            <ListItemButton
              component={NavLink}
              to={`/${category}/${subCat}`}
              onClick={() => setSubCategory(subCat)}
            >
              <ListItemText primary={subCat}>{subCat}</ListItemText>
            </ListItemButton>
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesPage;
