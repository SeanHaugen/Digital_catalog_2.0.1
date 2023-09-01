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
      {/* <CssBaseline /> */}

      {/* <Container> */}
      {/* <Sheet variant="soft" color="primary" className="box"> */}
      {/* <Box sx={{ minHeight: 350 }}> */}
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: "90%",
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
          // transition: "transform 0.3s, border 0.3s",
          // "&:hover": {
          //   borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          //   transform: "translateY(-2px)",
          // },
          // "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
        })}
      >
        {/* <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 1,
            display: "contents",
            "--AspectRatio-paddingBottom":
              "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
          }}
        > */}
        {/* <Box sx={{ display: "flex" }}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ ml: "auto", alignSelf: "flex-start" }}
              >
                <FavoriteBorderRoundedIcon color="danger" />
              </IconButton>
            </Box> */}
        {/* </AspectRatio> */}

        <Routes>
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
          <Route path="*" element={<FrontPage />} />
        </Routes>

        {/* </Container> */}
      </Card>
      {/* </Box> */}
      {/* </Sheet> */}
    </React.Fragment>
  );
}

export default Main;
