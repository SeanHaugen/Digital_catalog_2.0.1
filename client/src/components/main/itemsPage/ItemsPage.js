import * as React from "react";
import Grid from "@mui/material/Grid";
import { Item } from "../../../helper/Item";
import PricingTable from "./pricing/Pricing";
import FindImage from "./findImage/FindImage";
import Description from "./description/Description";
import Breadcrumb from "./breadcrumbs/BreadCrumbs";
import ItemTabs from "./tabs/ItemTabs";

function ItemPage({ productData, category, subCategory }) {
  // const [copiedText, setCopiedText] = useState("");
  // const copyText = () => {
  //   copiedText.select();
  //   navigator.clipboard.writeText(copyText.value);
  // };

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
          <Description productData={productData} />
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
    </div>
  );
}

export default ItemPage;
