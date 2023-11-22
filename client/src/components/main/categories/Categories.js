import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useFetchCategoryData } from "../../../api/api";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

function CategoriesPage({ item, category, setSubCategory }) {
  const [productsCategory, setProductsCategory] = useState([]);
  const [toggleImage, setToggleImage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // const imageName = `${productData.Item_Number}`;
  // const imageUrl = `https://www.showdowndisplays.com/cdn/Resources/Subcategory/${imageName}_subcat.jpg`;
  //https://www.showdowndisplays.com/cdn/Resources/Subcategory/262254_subcat.jpg

  useFetchCategoryData(setProductsCategory, category);
  // console.log(productsCategory);

  const toggleImagehandler = () => {
    setToggleImage(!toggleImage);
  };

  return (
    <>
      <h3
        style={{
          marginTop: "3em",
        }}
      >
        {category}
      </h3>
      <label>toggle images</label>
      <input type="checkbox" onClick={toggleImagehandler} />
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
                {toggleImage ? (
                  <div>
                    {/* <img
                      src={imageUrl}
                      alt={subCat}
                      style={{ maxWidth: "100%", height: "auto" }}
                    /> */}
                    <ListItemText
                      primary={subCat}
                      style={{ textAlign: "center" }}
                    >
                      {subCat}
                    </ListItemText>
                  </div>
                ) : (
                  <ListItemText
                    primary={subCat}
                    style={{ textAlign: "center" }}
                  >
                    {subCat}
                  </ListItemText>
                )}
              </ListItemButton>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CategoriesPage;
