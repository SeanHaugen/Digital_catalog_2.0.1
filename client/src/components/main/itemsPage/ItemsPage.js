import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Item } from "../../../helper/Item";
import PricingTable from "./pricing/Pricing";
import FindImage from "./findImage/FindImage";
import Description from "./description/Description";
import Breadcrumb from "./breadcrumbs/BreadCrumbs";
import ItemTabs from "./tabs/ItemTabs";
import StockButtons from "./stockbuttons/Stockbuttons";
import DeleteButton from "./Delete/DeleteButton.js";
import PromoButton from "../promoPage/PromoButton.js";

function ItemPage({
  productData,
  handlePromoSelect,
  selectedPromo,
  subCategory,
  category,
  setProduct,
}) {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [isLowStock, setIsLowStock] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(null);

  const handleDeleteSuccess = () => {
    setDeleteSuccess(true);
    setDeleteError(null);
  };

  const handleDeleteError = (error) => {
    setDeleteSuccess(false);
    setDeleteError(error);
  };

  const stockStyling = () => {
    if (isLowStock) {
      return <h1 style={{ backgroundColor: "yellow" }}>{productData.Name}</h1>;
    }
    if (isOutOfStock) {
      return <h1 style={{ backgroundColor: "red" }}>{productData.Name}</h1>;
    } else {
      return <h1>{productData.Name}</h1>;
    }
  };

  const leadTime = () => {
    if (productData.Lead_Times > 1) {
      return productData.Lead_Times - 1;
    } else {
      return 1;
    }
  };

  console.log(subCategory, category);

  return (
    <div
      className="item-page"
      style={{
        marginTop: "3em",
      }}
    >
      <Breadcrumb productData={productData} />
      {stockStyling()}
      <h2>{productData.Item_Number}</h2>

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid xs={6} md={5} margin="5px" justifyContent="center">
          <Item>
            <FindImage productData={productData} />
          </Item>
        </Grid>
        <Grid xs={6} md={6} style={{ margin: 10 }}>
          <Item>
            <Description productData={productData} />
          </Item>
        </Grid>
        <Grid xs={12}>
          <PricingTable productData={productData} />
        </Grid>
      </Grid>
      <Grid sx={{ flexGrow: 1 }} container spacing={0} margin={"5px"}>
        <Item>
          Setup: ${productData.SetupChg} G, $16 net
          <div>
            Lead Time: <b> {leadTime()} Business Days</b>
          </div>
        </Item>
      </Grid>
      <Grid xs={6} md={5}>
        <ItemTabs
          productData={productData}
          category={category}
          subCategory={subCategory}
          setProduct={setProduct}
        />
      </Grid>
      <div>
        <PromoButton productData={productData} />
        <StockButtons
          handlePromoSelect={handlePromoSelect}
          selectedPromo={selectedPromo}
          productData={productData}
          isLowStock={isLowStock}
          setIsLowStock={setIsLowStock}
          isOutOfStock={isOutOfStock}
          setIsOutOfStock={setIsOutOfStock}
        />
        <h2>Delete Product Item</h2>
        <DeleteButton
          itemNumber={productData.Item_Number} // Replace with your actual item number
          onDeleteSuccess={handleDeleteSuccess}
          onDeleteError={handleDeleteError}
        />
        {/* <label>Promo Item</label> */}

        {deleteSuccess && <p>Item deleted successfully!</p>}
        {deleteError && <p>Deleted: Reopen app to apply update</p>}
      </div>
    </div>
  );
}

export default ItemPage;
