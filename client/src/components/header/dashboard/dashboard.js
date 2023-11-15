import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/joy/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
// import ClickAwayListener from "@mui/base/ClickAwayListener";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import logo from "../../../frontpage_images/sd-logo.png";

import { Search } from "../search/Search";
import { SearchIconWrapper } from "../search/SearchIconWrapper";
import { Drawer, DrawerHeader } from "./Drawer";
import { StyledInputBase } from "../input/StyledInputBase";
import { AppBar } from "../appBar/AppBar";
import LoginModal from "../login/LoginModal";

import { useCategoryData, useSearchData } from "../../../api/api";
import Navigation from "../../navigation/BackForward";

export default function DashBoard({
  setCategory,
  setSearchData,
  query,
  setQuery,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [searchEntered, setSearchEntered] = useState(false);

  const navigate = useNavigate();

  useCategoryData(setCategoryData);

  useSearchData(setSearchData, query);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setOpen(true);
  };

  const handleClickAway = () => {
    setOpen(true);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuery(e.target.value);
      setSearchEntered(true); // Set the "search entered" state to true
      navigate(`/search`);
    }
  };
  console.log(searchEntered && console.log(query));

  return (
    <div onClickAway={handleClickAway}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" className="title">
              <NavLink to="/">
                <img src={logo} />
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
            <Navigation className="nav_buttons" />

            <NavLink to="/addProduct">
              <Button variant="outlined" color="primary">
                Add new product
              </Button>
            </NavLink>

            <NavLink to="/StockOutList">
              <Button variant="outlined" color="primary">
                Stock Out List
              </Button>
            </NavLink>

            <LoginModal />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <List>
            {categoryData.slice(1).map((cat, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                component={NavLink}
                to={`/${cat}`}
                onClickAway={handleClickAway}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? (
                      <ArrowDropDownCircleOutlinedIcon />
                    ) : (
                      <ArrowDropDownCircleOutlinedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={cat} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </div>
  );
}
