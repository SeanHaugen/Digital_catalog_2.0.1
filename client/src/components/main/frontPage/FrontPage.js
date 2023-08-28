import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import frontPageImg1 from "../../../frontpage_images/cb84cb63-bdb0-4c50-af78-5fc0fb0e0e15.jpg";
import outDoorProducts from "../../../frontpage_images/outDoor_products.jpg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FrontPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid>
          <figure style={{ display: "flex", justifyContent: "center" }}>
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
          </figure>
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <figure style={{ display: "flex", justifyContent: "center" }}>
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
          </figure>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FrontPage;
