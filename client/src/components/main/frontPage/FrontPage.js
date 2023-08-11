import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

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
        <Grid xs="auto">
          <Item>Hello</Item>
        </Grid>
        <Grid xs={6}>
          <Item>This is a test... again</Item>
        </Grid>
        <Grid xs>
          <Item>Goodbye</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FrontPage;
