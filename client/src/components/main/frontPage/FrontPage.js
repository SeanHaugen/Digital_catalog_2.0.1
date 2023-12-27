import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Grid from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Promos from "../promoPage/Promos";
import OutdoorProducts from "../OutdoorProductsPage/OutdoorProductsPage";
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
      <div container>
        {/* Grid item with image and link */}
        {/* <Grid item xs={12}>
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
        </Grid> */}

        {/* Grid item with banner and link */}
        <Grid item>
          <div>
            <Typography
              variant="body1"
              style={{ display: "flex", marginTop: ".5em" }}
            >
              <Button variant="contained" color="success">
                <NavLink
                  onClick={() => {
                    if (
                      window.confirm(
                        "You are leaving the app, once you leave you will need to reopen the app"
                      )
                    ) {
                      window.location.href =
                        "https://www.showdowndisplays.com/category/buildyourown";
                    }
                  }}
                  style={{ color: "white" }}
                >
                  Custom Banner Tool
                </NavLink>
              </Button>
            </Typography>
            <Typography
              variant="body1"
              style={{ display: "flex", marginTop: ".5em" }}
            >
              <Button variant="contained" color="success">
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
                  style={{ color: "white" }}
                >
                  Custom Master Document
                </NavLink>
              </Button>
            </Typography>
            <Typography
              variant="body1"
              style={{ display: "flex", marginTop: ".5em" }}
            >
              <NavLink to={"/OutdoorProducts"}>
                <Button
                  variant="contained"
                  color="success"
                  style={{
                    // backgroundColor: "#7B919C",
                    marginRight: "5px",
                  }}
                >
                  Outdoor Products
                </Button>
              </NavLink>
            </Typography>
            <Typography
              variant="body1"
              style={{ display: "flex", marginTop: ".5em" }}
            >
              <NavLink to={"/Promos"}>
                <Button
                  variant="contained"
                  color="success"
                  style={{
                    // backgroundColor: "#7B919C",
                    marginRight: "5px",
                  }}
                >
                  Promo Products
                </Button>
              </NavLink>
            </Typography>
            <Typography
              variant="body1"
              style={{ display: "flex", marginTop: ".5em" }}
            >
              <NavLink to={"/addProduct"}>
                <Button
                  variant="contained"
                  color="success"
                  style={{
                    // backgroundColor: "#7B919C",
                    marginRight: "5px",
                  }}
                >
                  Add Products
                </Button>
              </NavLink>
            </Typography>
            <Typography
              variant="body1"
              style={{ display: "flex", marginTop: ".5em" }}
            >
              <NavLink to={"/NewProducts"}>
                <Button
                  variant="contained"
                  color="success"
                  style={{
                    // backgroundColor: "#7B919C",
                    marginRight: "5px",
                  }}
                >
                  New Products
                </Button>
              </NavLink>
            </Typography>
          </div>
          <Grid>
            <Paper>
              <h1>Change Log</h1>
              <ul>
                <li>Added Change Log</li>
                <li>Updated buttons</li>
                <li>Added Comparison Charts</li>
                <li>Added new user registration</li>
              </ul>
            </Paper>
          </Grid>
          <Paper>
            <header>
              <h2>Future plans</h2>
              <p>Plans for future development</p>
              <ul>
                <li>Allow users to Save Items in a "Favorites" list</li>
                <li>
                  Implement a Fedex freight calculator where all that is needed
                  is a zip code
                </li>
                <li>Allow users to edit their individual layout</li>
                <li>
                  Add dedicated sidebar or Tab for the hardware and replacement
                  graphics of relevant items
                </li>
                <li>
                  Self promo and Canada Flat rate calculations done
                  automatically
                </li>
                <li>
                  Revamping related items to be more useful. For example the
                  related items should show the related, hardware, graphic, or
                  kit for the item your looking at.
                </li>
                <li>
                  Adding a pop open sidebar for subcategories when hovering over
                  that category
                </li>
                <li>Adding clearance items/list</li>
                <li>User authentication</li>
              </ul>
              <h2>Wishlist</h2>
              These are things that I'm hoping we can implement however due to
              limitations in my position they may not be possible
              <ul>
                <li>Pricing up to qty 100</li>
                <li>Inventory linked to item pages</li>
                <li>Matching cases to items</li>
              </ul>
              <h3>Bugs</h3>
              <p>
                There are many bugs you might encounter. If you find one please
                let me know and I'll address it as soon as possible.
                <ul>Known Bugs</ul>
                <li>
                  Search bar not optimized. Will not accept special characters
                  such as quotations to denote ft and inches
                </li>
                {/* <li></li> */}
              </p>
            </header>
          </Paper>
        </Grid>
      </div>
    </Box>
  );
}

export default FrontPage;

{
  /* <iframe
              src="https://signzoneinc.sharepoint.com/sites/CustomerServiceDatabase"
              width="1500"
              height="800"
              style={{
                marginTop: "2em",
                display: "flex",
                justifyContent: "center",
              }}
            ></iframe>


        {/* Repeat the pattern for other grid items */
}
{
  /* Grid item with Aluminum Prints */
}
{
  /* <Grid item xs={12} md={6}>
          <Paper> */
}
{
  /* <NavLink
              to={`/Decor/Aluminum Prints`}
              onClick={() => setSubCategory("Aluminum Prints")}
            > */
}
{
  /* <img
              className="placeholder"
              src={frontPageImg1}
              alt="Aluminum Prints"
              style={{
                width: "100%",
                objectFit: "contain",
              }}
            /> */
}
{
  /* </NavLink> */
}
{
  /* </Paper>
        </Grid> */
}

{
  /* Grid item with Outdoor Products */
}
{
  /* <Grid item xs={12} md={6}>
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
        </Grid> */
}

{
  /* Grid item with Enviro Products */
}
{
  /* <Grid item xs={12}>
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
        </Grid> */
}
