import React, { useState } from "react";

import Main from "./components/main/Main_page";
import { BrowserRouter as Router } from "react-router-dom";
import DashBoard from "./components/header/dashboard/dashboard";
import { useFetchSubCategoryItemData, useFetchItemData } from "./api/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import BottomNav from "./components/footer/BottomNav";

function App() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [item, setItem] = useState([]);
  const [product, setProduct] = useState([]);
  const [productData, setProductData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");
  const [contextMenu, setContextMenu] = useState(null);

  useFetchSubCategoryItemData(setItem, subCategory);
  useFetchItemData(setProductData, product);

  console.log(searchData);
  console.log(product);

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

  // const { ipcRenderer } = require('electron');

  // function handleNewTabClick() {
  //   const newTabUrl = 'https://example.com'; // Replace this with the desired URL for the new tab
  //   ipcRenderer.send('create-new-tab', newTabUrl);
  // }

  return (
    <Router>
      <div
        className="App"
        onContextMenu={handleContextMenu}
        style={{ cursor: "context-menu" }}
      >
        <Typography>
          <DashBoard
            setCategory={setCategory}
            setSubCategory={setSubCategory}
            setSearchData={setSearchData}
            setQuery={setQuery}
            query={query}
          />
          <Main
            category={category}
            setSubCategory={setSubCategory}
            subCategory={subCategory}
            item={item}
            setProduct={setProduct}
            productData={productData}
            searchData={searchData}
          />
        </Typography>
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
          <MenuItem>Hello world</MenuItem>
          <MenuItem onClick={handleClose}>Copy</MenuItem>
          <MenuItem onClick={handleClose}>Print</MenuItem>
          <MenuItem onClick={handleClose}>Highlight</MenuItem>
          <MenuItem onClick={handleClose}>Add To PDF</MenuItem>
          <MenuItem onClick={handleClose}>Email</MenuItem>
        </Menu>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
