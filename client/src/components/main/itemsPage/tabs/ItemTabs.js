import * as React from "react";
import { useState, useEffect } from "react";
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
import ComparisonEmbed from "./ComparisonEmbed";
import GraphicInfo from "./GraphicInfo";
import BannerDetails from "./BannerDetails";

function ItemTabs({
  productData,
  category,
  subCategory,
  setProduct,
  username,
}) {
  const [value, setValue] = React.useState(0);
  const [finishingStyle, setFinishingStyle] = useState("");
  const [compChart, setComparisonChart] = useState("");

  useEffect(() => {
    setFinishingStyle(productData.SubCategory);
    setComparisonChart(productData.Category);
  }, [productData.Category]);

  console.log(compChart);
  const materialsArray = productData.Materials?.split(/\s*,\s*/) || [];
  const showMaterials = () => {
    return (
      <ul>
        {materialsArray.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRenderTabs = () => {
    if (compChart === "Banners & Flags") {
      return (
        <Tab
          style={{
            backgroundColor: value === 10 ? "white" : "gray",
            margin: "3px",
            borderRadius: "10px 10px 0 0px",
          }}
        >
          Banner Details
        </Tab>
      );
    }
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
              Colors
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
            <Tab
              style={{
                backgroundColor: value === 8 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Comparison Charts/Guides
            </Tab>
            <Tab
              style={{
                backgroundColor: value === 9 ? "white" : "gray",
                margin: "3px",
                borderRadius: "10px 10px 0 0px",
              }}
            >
              Graphic Info
            </Tab>
            {handleRenderTabs()}
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
            {/* style={{ backgroundColor: "#7B919C" }} */}
            <Item>
              <ColorBox productData={productData} compChart={compChart} />
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
          <TabPanel value={8}>
            <ComparisonEmbed
              compChart={compChart}
              productData={productData}
              category={category}
              subCategory={subCategory}
            />
          </TabPanel>
          <TabPanel value={9}>
            <GraphicInfo
              finishingStyle={finishingStyle}
              productData={productData}
              category={category}
              subCategory={subCategory}
            />
          </TabPanel>
          <TabPanel value={10}>
            <BannerDetails productData={productData} compChart={compChart} />
          </TabPanel>
        </Tabs>
      </Grid>
    </div>
  );
}
export default ItemTabs;
