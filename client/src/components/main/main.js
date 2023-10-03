import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
import Sheet from "@mui/joy/Sheet";
// import Paper from "@mui/material/Paper";
// import Container from "@mui/material/Container";

import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IconButton from "@mui/joy/IconButton";
import AspectRatio from "@mui/joy/AspectRatio";

import { Routes, Route } from "react-router-dom";
import CategoriesPage from "./categories/Categories";
import FrontPage from "./frontPage/FrontPage";
import SubCategoriesPage from "./subCategory/SubCategory";
import ItemPage from "./itemsPage/ItemsPage";
import SearchPage from "./searchPage/SearchPage";
import Form from "./forms/Form";
// import FavoriteList from "./favorites/Favorites";

function Main({
  setSubCategory,
  category,
  subCategory,
  item,
  setProduct,
  productData,
  searchData,
}) {
  // console.log(searchData);

  return (
    <React.Fragment>
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: "95%",
          marginLeft: 10,
          marginRight: 10,
          // height: "fitContent",
          display: "flex",
          gridColumn: "span 2",
          flexDirection: "column",
          flexWrap: "wrap",
          // resize: "vertical",
          // overflow: "scroll",
          gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
        })}
      >
        <Routes>
          <Route
            path="/"
            element={
              <FrontPage
                category={category}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
              />
            }
          />
          <Route
            path="/:category"
            element={
              <CategoriesPage
                category={category}
                setSubCategory={setSubCategory}
              />
            }
          />
          <Route
            path="/:category/:subCategories"
            element={
              <SubCategoriesPage
                category={category}
                subCategory={subCategory}
                item={item}
                setProduct={setProduct}
              />
            }
          />
          <Route
            path="/:category/:subCategories/:itemsPage"
            element={
              <ItemPage
                category={category}
                subCategory={subCategory}
                productData={productData}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                searchData={searchData}
                setProduct={setProduct}
                category={category}
                subCategory={subCategory}
                item={item}
                productData={productData}
              />
            }
          />
        </Routes>

        {/* </Container> */}
      </Card>
      {/* </Box> */}
      {/* </Sheet> */}
    </React.Fragment>
  );
}

export default Main;
