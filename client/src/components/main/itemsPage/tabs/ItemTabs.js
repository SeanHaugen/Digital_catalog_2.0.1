import * as React from "react";
import { useState } from "react";
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
import NoteTaker from "./NoteTaker";

function ItemTabs({
  productData,
  category,
  subCategory,
  setProduct,
  username,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Tabs
          aria-label="Basic tabs"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <TabList style={{}}>
            <Tab
              style={{
                backgroundColor: value === 0 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Details
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 1 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Shipping
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 2 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              colors
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 3 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Internal Info
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 4 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Customer Service Info
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 5 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Media Specs
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 6 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Suggested Items
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 7 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Notes
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <Details
              productData={productData}
              materialsArray={materialsArray}
              showMaterials={showMaterials}
            />
          </TabPanel>
          <TabPanel value={1}>
            <Item style={{ backgroundColor: "lightgray" }}>
              <FlatRateShipping productData={productData} />
            </Item>
          </TabPanel>
          <TabPanel value={2}>
            <Item style={{ backgroundColor: "lightgray" }}>
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
          <TabPanel value={7}>
            <NoteTaker username={username} />
          </TabPanel>
        </Tabs>
      </Grid>
    </div>
  );
}
export default ItemTabs;
