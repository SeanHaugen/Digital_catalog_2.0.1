import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Toolbar, IconButton, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import logo from "../../../Resources/frontpage_images/sd-logo.png";
import { Search } from "../search/Search";
import { SearchIconWrapper } from "../search/SearchIconWrapper";
import { Drawer, DrawerHeader } from "./Drawer";
import { StyledInputBase } from "../input/StyledInputBase";
// import { StyledToolbar } from "../input/StyledToolBar";
import LowerBar from "./DashboardPages";
import { useCategoryData, useSearchData } from "../../../api/api";
import { useFetchCategoryData } from "../../../api/api";
import SubCategoryDrawer from "./SubCategoryDrawer";

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "#091138",
  color: "#fff",
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function DashBoard({
  setCategory,
  setSearchData,
  query,
  setQuery,
  username,
  setUsername,
  productData,
  setProduct,
  subCategory,
  setProductsCategory,
  category,
  setSubCategory,
  productsCategory,
}) {
  const [open, setOpen] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();

  useCategoryData(setCategoryData);
  useSearchData(setSearchData, query);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValue = e.target.value.trim(); // Trim leading and trailing spaces

      // Encode the search string
      const encodedValue = encodeURIComponent(inputValue);

      setQuery(encodedValue);
      navigate(`/search`);
    }
  };
  console.log(typeof query);

  /////////Testing hover state and stuff
  useFetchCategoryData(setProductsCategory, category);

  return (
    <div className="dashboard">
      <StyledToolbar>
        <Typography
          variant="h6"
          noWrap
          component="Typography"
          className="title"
        >
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            list="search-options"
            onKeyDown={handleSearch}
          />
        </Search>
      </StyledToolbar>
      <Drawer variant="permanent" open={open}>
        <List style={{ paddingTop: "5em" }}>
          {categoryData.slice(2).map((cat, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                component={NavLink}
                to={`/${cat}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <ListItemText
                  primary={cat}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "#CECDCB", // Set link text color to white
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <LowerBar
        className="lowBar"
        username={username}
        setUsername={setUsername}
        productData={productData}
        setProduct={setProduct}
      />
    </div>
  );
}
