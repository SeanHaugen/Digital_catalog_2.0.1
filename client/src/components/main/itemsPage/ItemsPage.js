import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Link from "@mui/joy/Link";

import PricingTable from "./pricing/Pricing";
import FlatRateShipping from "./flat_rate_shipping/FlatRate";
import ColorBox from "./color_grid/ColorBox";
import FindImage from "./findImage/FindImage";
import Form from "../forms/Form";

import { useInternalInfo } from "../../../api/api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function ItemPage({ productData, category, subCategory }) {
  const [editing, setEditing] = useState(false);

  const [internalInfo, setInternalInfo] = useState([]);
  useInternalInfo(setInternalInfo, productData.Item_Number);

  const [editDescription, setEditDescription] = useState(
    productData.Description
  );

  const description = productData.Description || "";

  const descriptionBullets = description
    .split(/[.!?]/)
    .filter((sentence) => sentence.trim() !== "");

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  console.log(editDescription);

  return (
    <div>
      <Breadcrumbs separator={<KeyboardArrowRight />} aria-label="breadcrumbs">
        {[
          {
            label: productData.Category,
            path: `/${productData.Category}`,
          },
          {
            label: productData.SubCategory,
            path: `/${productData.Category}/${productData.SubCategory}`,
          },
          {
            label: productData.Item_Number,
            path: `/${productData.Category}/${productData.SubCategory}/${productData.Item_Number}`,
          },
        ].map((item) => (
          <Link
            key={item.label}
            component={NavLink}
            to={item.path}
            color="success"
            variant="soft"
            level="h4"
          >
            {item.label}
          </Link>
        ))}
        {/* {productData.Category}--{productData.SubCategory} */}
      </Breadcrumbs>
      <h1>{productData.Name}</h1>
      <h2>{productData.Item_Number}</h2>

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid xs={6} md={7} margin="5px" justifyContent="center">
          <Item>
            <FindImage
              productData={productData}
              category={category}
              subCategory={subCategory}
            />
          </Item>
        </Grid>
        <Grid xs={6} md={4}>
          <Item>
            {editing ? (
              <textarea
                type="text"
                value={editDescription}
                onChange={handleDescriptionChange}
                rows={4}
                cols={50}
              />
            ) : (
              <ul>
                {descriptionBullets.map((point, index) => {
                  return (
                    <li key={index} style={{ fontSize: "16px" }}>
                      {point}
                    </li>
                  );
                })}
              </ul>
            )}
            <Form
              editing={editing}
              toggleEditing={toggleEditing}
              productData={productData}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              handleDescriptionChange={handleDescriptionChange}
            />
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
            <div>{productData.Lead_Times} Business Days</div>
          </Item>
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <Tabs aria-labe="Basic tabs" defaultValue={0}>
            <TabList>
              <Tab>Details</Tab>
              <Tab>Shipping</Tab>
              <Tab>colors</Tab>
              <Tab>Internal Info</Tab>
              <Tab>Additional Info</Tab>
              <Tab>Images</Tab>
            </TabList>
            <TabPanel value={0}>
              <Item>
                Product Weight:
                {productData.Product_Weight}
              </Item>
              <Item>Materials: {productData.Materials}</Item>
              <Item>Origin: {productData.Origin}</Item>
              <Item>Pg: {productData.Page}</Item>
            </TabPanel>
            <TabPanel value={1}>
              <Item>
                <FlatRateShipping productData={productData} />
              </Item>
              <Item>{productData.Package_Size}</Item>
              <Item>Shipping Weight: {productData.Package_Weight}</Item>
              <Item>Dimensional Weight: NA</Item>
            </TabPanel>
            <TabPanel value={2}>
              <Item>
                <ColorBox productData={productData} />
              </Item>
            </TabPanel>
            <TabPanel value={3}>
              {internalInfo.Internal_Info !== undefined ? (
                internalInfo.Internal_Info.map((info, index) => (
                  <div key={index}>{info}</div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </TabPanel>
            <TabPanel value={4}></TabPanel>
          </Tabs>
        </Grid>
      </Grid>
    </div>
  );
}

export default ItemPage;

// const [imageURL, setImageURL] = useState("");

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const imageFolder =
//         "https://signzoneinc.sharepoint.com/sites/customerservicedatabase/shared%20documents/general/images/01products";
//       const imageName = `${productData.Item_Number}_0.jpg?web=1`;

//       const imageURL = `${imageFolder}/${imageName}`;
//       setImageURL(imageURL);
//     } catch (error) {
//       console.error("error fetching image", error);
//     }
//   };
//   fetchData();
// }, [productData.Item_Number]);

// console.log(imageURL);

// // const filePath = '/images'
// const imagePath = `/images/${productData.Item_Number}_0.jpg`;
// console.log(imagePath);
