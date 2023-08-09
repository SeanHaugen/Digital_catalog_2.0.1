import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";

import PricingTable from "./pricing/Pricing";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function ItemPage({ productData }) {
  console.log(productData);

  return (
    <div>
      <h4>
        {productData.Category}--{productData.SubCategory}
      </h4>
      <h1>{productData.Name}</h1>
      <h2>{productData.Item_Number}</h2>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap flexWrap="wrap">
          <Item>Image here{productData.Image}</Item>
          <Item>{productData.Description}</Item>
          <Item>Pg: {productData.Page}</Item>
          <PricingTable productData={productData} />
          <Item>Setup: {productData.SetupChg}</Item>
          <Item>
            <AccessTimeIcon /> {productData.Lead_Times} Business Days
          </Item>
          <Item>
            <MonitorWeightIcon />
            {productData.Product_Weight}
          </Item>
          <Item>Keywords: {productData.Keywords}</Item>
          <Item>Materials: {productData.Materials}</Item>
          <Item>Origin: {productData.Origin}</Item>
        </Stack>
      </Box>
    </div>
  );
}

export default ItemPage;
