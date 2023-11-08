import * as React from "react";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import { Item } from "../../../../helper/Item";
import InternalInfo from "./InternalInfo";
import FlatRateShipping from "../flat_rate_shipping/FlatRate";
import ColorBox from "./color_grid/ColorBox";
import MediaSpecs from "./MediaSpecs";
import AdditionalInfo from "./AdditionalInfo";
import Details from "./Details";
import RelatedItems from "./RelatedItems";

function ItemTabs({ productData, category, subCategory, setProduct }) {
  console.log(typeof productData.Materials);
  const materialsArray = productData.Materials?.split(/\s*,\s*/) || [];
  console.log(materialsArray);

  const showMaterials = () => {
    return (
      <ul>
        {materialsArray.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <Grid>
        <Tabs aria-label="Basic tabs" defaultValue={0}>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Shipping</Tab>
            <Tab>colors</Tab>
            <Tab>Internal Info</Tab>
            <Tab>Customer Service Info</Tab>
            <Tab>Media Specs</Tab>
            <Tab>Suggested Items</Tab>
          </TabList>
          <TabPanel value={0}>
            <Details
              productData={productData}
              materialsArray={materialsArray}
              showMaterials={showMaterials}
            />
          </TabPanel>
          <TabPanel value={1}>
            <Item>
              <FlatRateShipping productData={productData} />
            </Item>
          </TabPanel>
          <TabPanel value={2}>
            <Item>
              <ColorBox productData={productData} />
            </Item>
          </TabPanel>
          <TabPanel value={3}>
            <InternalInfo productData={productData} />
          </TabPanel>
          <TabPanel value={4}>
            <AdditionalInfo productData={productData} />
          </TabPanel>
          <TabPanel value={5}>
            <MediaSpecs
              productData={productData}
              materialsArray={materialsArray}
              showMaterials={showMaterials}
            />
          </TabPanel>
          <TabPanel value={6}>
            <RelatedItems
              productData={productData}
              category={category}
              subCategory={subCategory}
              setProduct={setProduct}
            />
          </TabPanel>
        </Tabs>
      </Grid>
    </div>
  );
}
export default ItemTabs;
