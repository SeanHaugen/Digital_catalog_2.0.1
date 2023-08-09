import SubCategoriesPage from "./subCategory/SubCategory";
import ItemPage from "./ItemsPage/ItemPage";
import SearchPage from "./searchPage/SearchPage";

function Main({
  setSubCategory,
  category,
  subCategory,
  item,
  setProduct,
  productData,
  searchData,
}) {
  console.log(searchData);

  return (
    <React.Fragment>
      <CssBaseline />

      <Container fixed>
        <Box sx={{ bgcolor: "#dfe2f2", height: "fitContent" }} className="box">
          <Routes>
            <Route path="*" element={<FrontPage />} />
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
              path="/:category/:subCategories/:itemPage"
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
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Main;
