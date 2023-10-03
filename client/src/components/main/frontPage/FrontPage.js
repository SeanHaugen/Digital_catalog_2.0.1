import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import frontPageImg1 from "../../../frontpage_images/cb84cb63-bdb0-4c50-af78-5fc0fb0e0e15.jpg";
import outDoorProducts from "../../../frontpage_images/outDoor_products.jpg";
import banner from "../../../frontpage_images/banner.jpg";
import enviro from "../../../frontpage_images/enviro_products.jpg";
import { Item } from "../../../helper/Item";
import { useFetchCategoryData } from "../../../api/api";

function FrontPage({ category, setSubCategory }) {
  const [productsCategory, setProductsCategory] = useState([]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid>
          <figure style={{ display: "flex", justifyContent: "center" }}>
            <NavLink
              to={`/Decor/Aluminum Prints`}
              onClick={() => setSubCategory("Aluminum Prints")}
            >
              <img
                className="placeholder"
                src={frontPageImg1}
                alt="Aluminum Prints"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </NavLink>
          </figure>
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <figure style={{ display: "flex", justifyContent: "center" }}>
            <a href="">
              <img
                className="placeholder"
                src={outDoorProducts}
                alt="Outdoor products"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </a>
          </figure>
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <figure style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="placeholder"
              src={banner}
              alt="Outdoor products"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </figure>
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <figure style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="placeholder"
              src={enviro}
              alt="Outdoor products"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </figure>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FrontPage;
