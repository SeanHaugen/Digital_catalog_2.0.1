import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OOS.css";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

function StockOutList({ productData, setProduct }) {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);

  const useFetchOOSData = (setState) => {
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(
            "https://dull-pink-termite-slip.cyclic.app/items/oos" // Replace with the actual URL for fetching data
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
              <div className="product-name">{product.Name}</div>
              <div className="product-number">{product.Item_Number}</div>
            </ListItemButton>
          </div>
        ))}
      </ul>
    </div>
  );
}
export default StockOutList;
