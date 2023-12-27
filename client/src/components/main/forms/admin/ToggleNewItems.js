import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

function ToggleNewItems({ productData }) {
  const [newProduct, setNewProduct] = useState(null);

  useEffect(() => {
    setNewProduct(productData.New_Item);
  }, [productData]);

  const handleNewItemToggle = async () => {
    if (newProduct !== null) {
      const newIsNewProduct = !newProduct;
      setNewProduct(newIsNewProduct);

      // Send a PUT request to your server to toggle New_Item
      try {
        const response = await axios.put(
          `https://dull-pink-termite-slip.cyclic.app/toggle-newItem/${productData.Item_Number}`
        );

        if (response.status === 200) {
          setNewProduct(response.data.New_Item);
        } else {
          // If the request was successful but the status code is not 200, handle it accordingly
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error updating New Item:", error);
        // Handle the error
        setNewProduct(!newIsNewProduct); // Revert the state if the request fails
      }
    }
  };

  return (
    <>
      <div>
        <label> New Item</label>
        <Checkbox
          type="checkbox"
          checked={newProduct === true}
          onChange={handleNewItemToggle}
        />
      </div>
    </>
  );
}

export default ToggleNewItems;
