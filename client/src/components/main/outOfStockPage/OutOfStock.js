import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OOS.css";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";

function StockOutList({ productData, setProduct }) {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const useFetchOOSData = (setState) => {
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(
            "https://dull-pink-termite-slip.cyclic.app/items/oos"
          );
          setState(response.data);
          setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }, []);
  };

  const useFetchLowStockData = (setState) => {
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(
            "https://dull-pink-termite-slip.cyclic.app/items/lowStock"
          );
          setState(response.data);
          setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }, []);
  };

  useFetchOOSData(setOutOfStockProducts);
  useFetchLowStockData(setLowStockProducts);

  console.log(outOfStockProducts);

  return (
    <div>
      <h1>Out of Stock Items</h1>
      <ul className="product-grid">
        {outOfStockProducts.map((product) => (
          <div>
            <ListItemButton
              key={product.id}
              className="product-item"
              component={NavLink}
              to={`/category/subcategory/${product.Item_Number}`}
              onClick={() => setProduct(product.Item_Number)}
            >
              <img
                src={`https://www.showdowndisplays.com/cdn/Resources/Primary/${product.Item_Number}_0_Preview.jpg`}
                alt="item"
                style={{ maxWidth: "10%", height: "auto" }}
              />
              <div className="product-name">
                {product.Name}: {product.Item_Number}
              </div>
            </ListItemButton>
          </div>
        ))}
      </ul>
      <h1>Modified Items</h1>
      <ul className="product-grid">
        {lowStockProducts.map((product) => (
          <div>
            <ListItemButton
              key={product.id}
              className="product-item"
              component={NavLink}
              to={`/category/subcategory/${product.Item_Number}`}
              onClick={() => setProduct(product.Item_Number)}
            >
              <img
                src={`https://www.showdowndisplays.com/cdn/Resources/Primary/${product.Item_Number}_0_Preview.jpg`}
                alt="item"
                style={{ maxWidth: "10%", height: "auto" }}
              />
              <div className="product-name">
                {product.Name}: {product.Item_Number}
              </div>
            </ListItemButton>
          </div>
        ))}
      </ul>
    </div>
  );
}
export default StockOutList;
