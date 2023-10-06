import React, { useState } from "react";
import Card from "@mui/joy/Card";

import { Routes, Route } from "react-router-dom";
import CategoriesPage from "./categories/Categories";
import FrontPage from "./frontPage/FrontPage";
import SubCategoriesPage from "./subCategory/SubCategory";
import ItemPage from "./itemsPage/ItemsPage";
import SearchPage from "./searchPage/SearchPage";
import FormPage from "./forms/FormPage";
import Promos from "./promoPage/Promos";
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

  const [selectedPromo, setSelectedPromo] = useState([]);

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
          <Route
            path="/addProduct"
            element={
              <FormPage
                searchData={searchData}
                setProduct={setProduct}
                category={category}
                subCategory={subCategory}
                item={item}
                productData={productData}
                selectedPromo={selectedPromo}
                setSelectedPromo={setSelectedPromo}
              />
            }
          />
          <Route
            path="/Promos"
            element={
              <Promos
                searchData={searchData}
                setProduct={setProduct}
                category={category}
                subCategory={subCategory}
                item={item}
                productData={productData}
                selectedPromo={selectedPromo}
                setSelectedPromo={setSelectedPromo}
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
