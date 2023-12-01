import React, { useState, useEffect } from "react";
import "./app.css";
import Main from "./components/main/main";
import { HashRouter as Router } from "react-router-dom";
import DashBoard from "./components/header/dashboard/dashboard";
import { useFetchSubCategoryItemData, useFetchItemData } from "./api/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// import Typography from "@mui/material/Typography";
import BottomNav from "./components/footer/BottomNav";
import CopyToClipboardButton from "./helper/CopyToClipboard";
import NewWindowButton from "./helper/NewWindow";

function App() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [item, setItem] = useState([]);
  const [product, setProduct] = useState([]);
  const [productData, setProductData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");
  const [contextMenu, setContextMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = React.useState("");
  const [authToken, setAuthToken] = useState("");

  useFetchSubCategoryItemData(setItem, subCategory);
  useFetchItemData(setProductData, product);

  console.log(username);
  // console.log(productData);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Router>
      <div
        className="App"
        onContextMenu={handleContextMenu}
        // style={{
        //   cursor: "context-menu",
        //   display: "flex",
        //   flexFlow: "row no-wrap",
        //   marginTop: "4em",
        // }}
      >
        <DashBoard
          setCategory={setCategory}
          setSubCategory={setSubCategory}
          setSearchData={setSearchData}
          setQuery={setQuery}
          query={query}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          drawerOpen={drawerOpen}
          username={username}
          setUsername={setUsername}
          productData={productData}
          setProduct={setProduct}
        />
        <div
          className="main-container"
          style={{
            marginLeft: "200px", // Adjust margin based on drawer state
            transition: "margin-left 0.3s ease", // Add transition for smooth animation
          }}
        >
          <Main
            category={category}
            setSubCategory={setSubCategory}
            subCategory={subCategory}
            item={item}
            setProduct={setProduct}
            productData={productData}
            searchData={searchData}
            username={username}
            // drawerOpen={drawerOpen}
          />
        </div>
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <CopyToClipboardButton onClick={handleClose} />
          <NewWindowButton onClick={handleClose} />
          <MenuItem onClick={handleClose}>Highlight</MenuItem>
        </Menu>
      </div>
    </Router>
  );
}

export default App;
