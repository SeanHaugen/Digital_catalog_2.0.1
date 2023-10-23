import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useUpdateLowStock } from "../../../../api/api";
import { useUpdateOOS } from "../../../../api/api";
import { fetchLowStockValue } from "../../../../api/api";
import { fetchOOSValue } from "../../../../api/api";

function StockButtons({ productData, handlePromoSelect, selectedPromo }) {
  const [isPromo, setIsPromo] = useState(false);
  const [isLowStock, setIsLowStock] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(null);

  const handlePromoCheckboxChange = () => {
    setIsPromo(!isPromo);
  };

  useEffect(() => {
    console.log("Fetching initial value...");
    fetchLowStockValue(productData.Item_Number).then((value) => {
      setIsLowStock(value);
    });

    fetchOOSValue(productData.Item_Number).then((value) => {
      setIsOutOfStock(value);
    });
  }, [productData.Item_Number]);

  const handleLowStockCheckboxChange = () => {
    if (isLowStock !== null) {
      const newIsLowStock = !isLowStock;
      setIsLowStock(newIsLowStock);

      // Send a PUT request to your server to toggle Low_Stock
      axios.put(
        `https://dull-pink-termite-slip.cyclic.app/toggle-lowStock/${productData.Item_Number}`
      );
      if (newIsLowStock) {
        // Display an alert if isLowStock is true
        window.alert("Low Stock Alert: Inventory is low!");
      }
    } else {
      alert("Fetching the initial value... Please wait.");
    }
  };

  const handleOutOfStockCheckboxChange = () => {
    if (isOutOfStock !== null) {
      const newIsOutOfStock = !isOutOfStock;
      setIsOutOfStock(newIsOutOfStock);

      // Send a PUT request to your server to toggle Out_of_Stock
      axios.put(
        `https://dull-pink-termite-slip.cyclic.app/toggle-oos/${productData.Item_Number}`
      );
    } else {
      alert("Fetching the initial value... Please wait.");
    }
  };

  console.log(isLowStock);

  return (
    <div id="stock-buttons">
      <label>Promo Item</label>
      <input type="checkbox" />
      <label>, Inventory Low</label>
      <input
        type="checkbox"
        checked={isLowStock === true}
        onChange={handleLowStockCheckboxChange}
      />
      <label>, Out of Stock</label>
      <input
        type="checkbox"
        checked={isOutOfStock === true}
        onChange={handleOutOfStockCheckboxChange}
      />
    </div>
  );
}

export default StockButtons;
