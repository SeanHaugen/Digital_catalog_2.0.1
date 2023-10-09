import * as React from "react";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import { Item } from "../../../../helper/Item";
import InternalInfo from "./InternalInfo";
import FlatRateShipping from "../flat_rate_shipping/FlatRate";
import ColorBox from "../color_grid/ColorBox";
import MediaSpecs from "./MediaSpecs";
import AdditionalInfo from "./AdditionalInfo";
import Details from "./Details";

function ItemTabs({ productData }) {
  return (
    <div>
      <Grid>
        <Tabs aria-label="Basic tabs" defaultValue={0}>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Shipping</Tab>
            <Tab>colors</Tab>
            <Tab>Internal Info</Tab>
            <Tab>Additional Info</Tab>
            <Tab>Media Specs</Tab>
          </TabList>
          <TabPanel value={0}>
            <Details productData={productData} />
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
            <MediaSpecs productData={productData} />
          </TabPanel>
        </Tabs>
      </Grid>
    </div>
  );
}
export default ItemTabs;
