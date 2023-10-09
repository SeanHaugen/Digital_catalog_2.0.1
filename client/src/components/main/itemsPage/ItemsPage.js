import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Item } from "../../../helper/Item";
import PricingTable from "./pricing/Pricing";
import FindImage from "./findImage/FindImage";
import Description from "./description/Description";
import Breadcrumb from "./breadcrumbs/BreadCrumbs";
import ItemTabs from "./tabs/ItemTabs";
import DeleteButton from "./Delete/DeleteButton.js";

function ItemPage({ productData, handlePromoSelect, selectedPromo }) {
  // const [copiedText, setCopiedText] = useState("");
  // const copyText = () => {
  //   copiedText.select();
  //   navigator.clipboard.writeText(copyText.value);
  // };

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteSuccess = () => {
    setDeleteSuccess(true);
    setDeleteError(null);
  };

  const handleDeleteError = (error) => {
    setDeleteSuccess(false);
    setDeleteError(error);
  };

  return (
    <div>
      <Breadcrumb productData={productData} />
      <h1>{productData.Name}</h1>
      <h2>{productData.Item_Number}</h2>

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid xs={6} md={7} margin="5px" justifyContent="center">
          <Item>
            <FindImage productData={productData} />
          </Item>
        </Grid>
        <Grid xs={6} md={4}>
          <Item>
            <Description productData={productData} />
          </Item>
        </Grid>
        <Grid xs={12}>
          <PricingTable productData={productData} />
        </Grid>
      </Grid>
      <Grid sx={{ flexGrow: 1 }} container spacing={0} margin={"5px"}>
        <Grid>
          <Item>
            Setup: ${productData.SetupChg}
            <div>
              <b> Lead Time: {productData.Lead_Times} Business Days</b>
            </div>
          </Item>
        </Grid>
      </Grid>
      <Grid>
        <ItemTabs productData={productData} />
      </Grid>
      <div>
        <h2>Delete Product Item</h2>
        <DeleteButton
          itemNumber={productData.Item_Number} // Replace with your actual item number
          onDeleteSuccess={handleDeleteSuccess}
          onDeleteError={handleDeleteError}
        />
        {/* <label>Promo Item</label> */}
        <button type="button" onClick={() => handlePromoSelect(productData)}>
          add to promo page
        </button>
        <label>Inventory Low</label>
        <input type="checkbox" />
        <label>Out of Stock</label>
        <input type="checkbox" />

        {deleteSuccess && <p>Item deleted successfully!</p>}
        {deleteError && <p>Deleted: Reopen app to apply update</p>}
      </div>
    </div>
  );
}

export default ItemPage;
