import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import frontPageImg1 from "../../../Resources/frontpage_images/cb84cb63-bdb0-4c50-af78-5fc0fb0e0e15.jpg";
import outDoorProducts from "../../../Resources/frontpage_images/outDoor_products.jpg";
import banner from "../../../Resources/frontpage_images/banner.jpg";
import enviro from "../../../Resources/frontpage_images/enviro_products.jpg";
import Q4 from "../../../Resources/frontpage_images/Q4.jpg";
import { Item } from "../../../helper/Item";
import { useFetchCategoryData } from "../../../api/api";

function FrontPage({ category, setSubCategory }) {
  const [productsCategory, setProductsCategory] = useState([]);

  return (
    <Box>
      {/* Grid container */}
      <Grid container spacing={3}>
        {/* Grid item with image and link */}
        <Grid item xs={12}>
          <Paper>
            <NavLink to={"/Promos"}>
              <img
                className="placeholder"
                src={Q4}
                alt="Outdoor products"
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </NavLink>
          </Paper>
        </Grid>

        {/* Grid item with banner and link */}
        <Grid item xs={12}>
          <Paper>
            <NavLink
              onClick={() => {
                if (
                  window.confirm(
                    "You are leaving the app, once you leave you will need to reopen the app"
                  )
                ) {
                  window.location.href =
                    "https://www.showdowndisplays.com/Category/BuildYourOwn";
                }
              }}
            >
              <img
                className="placeholder"
                src={banner}
                alt="Outdoor products"
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </NavLink>
            <Typography variant="body1">
              <button>
                <NavLink
                  onClick={() => {
                    if (
                      window.confirm(
                        "You are leaving the app, once you leave you will need to reopen the app"
                      )
                    ) {
                      window.location.href =
                        "https://signzoneinc.sharepoint.com/:w:/s/ShowdownNorthAmerica/EQOUvm8yNl5Nu6DixOSoYcsBaAcSDDg1ldyu5ZphDRNiWQ?e=4%3AUhGPBl&at=9";
                    }
                  }}
                >
                  custom info
                </NavLink>
              </button>
            </Typography>
          </Paper>
        </Grid>

        {/* Repeat the pattern for other grid items */}
        {/* Grid item with Aluminum Prints */}
        <Grid item xs={12} md={6}>
          <Paper>
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
                  objectFit: "contain",
                }}
              />
            </NavLink>
          </Paper>
        </Grid>

        {/* Grid item with Outdoor Products */}
        <Grid item xs={12} md={6}>
          <Paper>
            <a href="">
              <img
                className="placeholder"
                src={outDoorProducts}
                alt="Outdoor products"
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </a>
          </Paper>
        </Grid>

        {/* Grid item with Enviro Products */}
        <Grid item xs={12}>
          <Paper>
            <img
              className="placeholder"
              src={enviro}
              alt="Enviro products"
              style={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FrontPage;
