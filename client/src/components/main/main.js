import React, { useState } from "react";
import axios from "axios";
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

// import { PromoItemModel as promos } from "../../../../server/models/promoItems";

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

  // const handlePromoSelect = async (productData) => {
  //   console.log("handlePromoSelect called with productData:", productData);
  //   try {
  //     // Make a POST request to add the selected item to the promos collection
  //     const response = await axios.post(
  //       "http://ivory-firefly-hem.cyclic.app/promo-items",
  //       productData
  //     );

  //     // Assuming the server responds with the newly added item
  //     const newPromoItem = response.data;

  //     setSelectedPromo((prevSelectedPromo) => [
  //       ...prevSelectedPromo,
  //       newPromoItem,
  //     ]);
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error("Error handling promo selection:", error);
  //   }
  //   console.log("Selected Promo after update:", selectedPromo);
  // };

  // const onDeletePromoItem = async (itemId) => {
  //   try {
  //     // Find the item in the promos collection and delete it
  //     await promos.deleteOne({ Item_Number: itemId });

  //     setSelectedPromo((prevSelectedPromo) =>
  //       prevSelectedPromo.filter(
  //         (selectedItem) => selectedItem.Item_Number !== itemId
  //       )
  //     );
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error("Error deleting promo item:", error);
  //   }
  // };

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
                productData={productData}
                selectedPromo={selectedPromo}
                handlePromoSelect={handlePromoSelect}
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
                onDeletePromoItem={onDeletePromoItem}
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
