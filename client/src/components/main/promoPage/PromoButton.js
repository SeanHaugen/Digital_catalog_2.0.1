import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function PromoButton({ productData }) {
  const handleAddPromo = async () => {
    try {
      const newItemData = {
        Item_Number: productData.Item_Number,
        Name: productData.Name,
      };

      const response = await axios.post(
        `https://dull-pink-termite-slip.cyclic.app/add/promo-items/${productData.Item_Number}`,
        newItemData
      );

      if (response.status === 201) {
        // The promo item was successfully added
        console.log("Promo item added:", response.data);
      } else {
        console.error("Failed to add promo item");
      }

      return response;
    } catch (error) {
      console.error("Error adding promo item:", error);
    }
  };

  return (
    <div>
      <label></label>
      <Button
        variant="contained"
        color="success"
        type="checkbox"
        onClick={handleAddPromo}
      >
        Add as Promo
      </Button>
    </div>
  );
}

export default PromoButton;
