import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/joy/Card";
import "./main.css";

import { Routes, Route } from "react-router-dom";

import CategoriesPage from "./categories/Categories";
import FrontPage from "./frontPage/FrontPage";
import SubCategoriesPage from "./subCategory/SubCategory";
import ItemPage from "./itemsPage/ItemsPage";
import SearchPage from "./searchPage/SearchPage";
import FormPage from "./forms/FormPage";
import Promos from "./promoPage/Promos";
import StockOutList from "./outOfStockPage/OutOfStock";
import NewProducts from "./newProductsPage/NewProducts";
// import FavoriteList from "./favorites/Favorites";

function Main({
  setSubCategory,
  category,
  subCategory,
  setProductsCategory,
  productsCategory,
  item,
  setProduct,
  productData,
  searchData,
  username,
}) {
  console.log(username);
  const [selectedPromo, setSelectedPromo] = useState([]);

  const handlePromoSelect = async (productData) => {
    console.log("handlePromoSelect called with productData:", productData);
    try {
      // Make a POST request to add the selected item to the promos collection
      const response = await axios.post(
        "https://dull-pink-termite-slip.cyclic.app/promo-items",
        productData
      );

      // Assuming the server responds with the newly added item
      const newPromoItem = response.data;

      setSelectedPromo((prevSelectedPromo) => [
        ...prevSelectedPromo,
        newPromoItem,
      ]);
    } catch (error) {
      // Handle any errors here
      console.error("Error handling promo selection:", error);
    }
    console.log("Selected Promo after update:", selectedPromo);
  };

  return (
    <React.Fragment>
      <div
        className="main"
        style={{
          width: "100%",
          objectFit: "contain",
        }}
      >
        <Routes>
          <Route
            path="/"
            exact
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
                productData={productData}
                item={item}
                setProductsCategory={setProductsCategory}
                productsCategory={productsCategory}
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
                productData={productData}
              />
            }
          />
          <Route
            path="/:category/:subCategories/:itemsPage"
            element={
              <ItemPage
                productData={productData}
                category={category}
                subCategory={subCategory}
                selectedPromo={selectedPromo}
                handlePromoSelect={handlePromoSelect}
                setProduct={setProduct}
                username={username}
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
            path="/StockOutList"
            element={
              <StockOutList
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
          <Route
            path="/NewProducts"
            element={
              <NewProducts
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
      </div>
    </React.Fragment>
  );
}

export default Main;
