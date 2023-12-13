import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

function OutdoorProducts({ productData, setProduct }) {
  const [getOutdoorProducts, setGetOutdoorProducts] = useState([]);

  const useGetNewItems = (setState) => {
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(
            "https://dull-pink-termite-slip.cyclic.app/get-outdoorItem"
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

  useGetNewItems(setGetOutdoorProducts);

  console.log(getOutdoorProducts);

  return (
    <div>
      <h1>New Products</h1>
      <ul className="product-grid">
        {getOutdoorProducts && getOutdoorProducts.length > 0 ? (
          getOutdoorProducts.map((product) => (
            <div key={product.Item_Number}>
              <ListItemButton
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
          ))
        ) : (
          <p>No new products available</p>
        )}
      </ul>
    </div>
  );
}

export default OutdoorProducts;
