import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

function NewProducts({ productData, setProduct }) {
  const [getNewProducts, setGetNewProducts] = useState([]);

  const useGetNewItems = (setState) => {
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(
            "https://dull-pink-termite-slip.cyclic.app/get-newItem"
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

  useGetNewItems(setGetNewProducts);

  console.log(getNewProducts);

  return (
    <div>
      <h1>New Products</h1>
      <ul className="product-grid">
        {getNewProducts && getNewProducts.length > 0 ? (
          getNewProducts.map((product) => (
            <div key={product.id}>
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

export default NewProducts;
