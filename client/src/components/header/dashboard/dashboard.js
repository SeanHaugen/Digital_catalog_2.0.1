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
import logo from "../../../frontpage_images/sd-logo.png";
// import { Search } from "../search/Search";
// import { SearchIconWrapper } from "../search/SearchIconWrapper";
import { Drawer, DrawerHeader } from "./Drawer";
// import { StyledInputBase } from "../input/StyledInputBase";
import LowerBar from "./DashboardPages";
import { useCategoryData, useSearchData } from "../../../api/api";

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "#091138",
  color: "#fff",
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Search = styled("div")({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: "#f0f0f0",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  marginLeft: "3em",
  width: "40%",
});

const SearchIconWrapper = styled("div")({
  padding: "0 8px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledInputBase = styled("input")({
  marginLeft: "2em",
  flex: 1,
  padding: "8px",
  width: "100%",
  border: "none",
  outline: "none",
});

export default function DashBoard({
  setCategory,
  setSearchData,
  query,
  setQuery,
  username,
  setUsername,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [searchEntered, setSearchEntered] = useState(false);

  const navigate = useNavigate();

  useCategoryData(setCategoryData);

  useSearchData(setSearchData, query);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  const handleClickAway = () => {
    setDrawerOpen(true);
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
    <div className="dashboard">
      <StyledToolbar>
        {/* <CustomIconButton color="inherit" aria-label="open drawer" edge="start">
          <MenuIcon />
        </CustomIconButton> */}
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
      />
    </div>
  );
}

//   <div onClickAway={handleClickAway}>
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             // onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" className="title">
//             <NavLink to="/">
//               <img src={logo} />
//             </NavLink>
//           </Typography>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ "aria-label": "search" }}
//               list="search-options"
//               onKeyDown={handleSearch}
//             />
//           </Search>
// //           <Navigation className="nav_buttons" />

//           <NavLink to="/addProduct">
//             <Button
//               variant="contained"
//               style={{
//                 color: "#C32B7E",
//                 backgroundColor: "#7B919C",
//                 margin: "10px",
//               }}
//             >
//               Add new product
//             </Button>
//           </NavLink>

//           <NavLink to="/StockOutList">
//             <Button
//               variant="contained"
//               style={{
//                 color: "#C32B7E",
//                 backgroundColor: "#093154",
//                 marginRight: "10px",
//               }}
//             >
//               Stock Out List
//             </Button>
//           </NavLink>

//           <LoginModal username={username} setUsername={setUsername} />
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           {/* <IconButton
//           // onClick={handleDrawerClose}
//           >
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton> */}
//         </DrawerHeader>

//         <List>
//           {categoryData.slice(1).map((cat, index) => (
//             <ListItem
//               key={index}
//               disablePadding
//               sx={{ display: "block" }}
//               component={NavLink}
//               to={`/${cat}`}
//               onClickAway={handleClickAway}
//             >
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                 }}
//                 onClick={() => handleCategoryClick(cat)}
//               >
//                 {/* <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {index % 2 === 0 ? (
//                     <ArrowDropDownCircleOutlinedIcon />
//                   ) : (
//                     <ArrowDropDownCircleOutlinedIcon />
//                   )}
//                 </ListItemIcon> */}
//                 <ListItemText
//                   primary={cat}
//                   sx={{
//                     opacity: open ? 1 : 0,
//                     color: "black", // Set link text color to white
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//     </Box>
//   </div>
// );
