import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Checkbox from "@mui/material/Checkbox";
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
  username,
}) {
  console.log(productData.Name);

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

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = (textToCopy) => {
    // Create a new textarea element and set its value to the text you want to copy
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // Select and copy the text to the clipboard
    textarea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    // Update the state to indicate that the text has been copied
    setIsCopied(true);

    // Reset the "Copied" message after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div
      className="item-page"
      style={{
        marginTop: "3em",
      }}
    >
      <Breadcrumb productData={productData} />
      {stockStyling()}
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "black",
          cursor: "pointer",
        }}
        onClick={() => handleCopyToClipboard(productData.Name)}
      >
        <ContentCopyIcon></ContentCopyIcon>
        {isCopied ? "Copied!" : "Copy to Clipboard"}
      </button>
      <hr
        class="rounded"
        stye={{
          borderTop: "8px solid #bbb",
          borderRadius: "5px",
        }}
      ></hr>
      <h2>
        Item # {productData.Item_Number}{" "}
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => handleCopyToClipboard(productData.Item_Number)}
        >
          <ContentCopyIcon></ContentCopyIcon>
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </h2>

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
          username={username}
        />
      </Grid>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexFlow: "column",
          // display: "grid",
          // gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Adjust the values as needed
          // gridGap: "10px", // Adjust the gap between grid items
        }}
      >
        <h3>Admin Workspace</h3>
        <hr />
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
