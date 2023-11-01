import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useUpdateLowStock } from "../../../../api/api";
import { useUpdateOOS } from "../../../../api/api";
import { fetchLowStockValue } from "../../../../api/api";
import { fetchOOSValue } from "../../../../api/api";

function StockButtons({
  productData,
  handlePromoSelect,
  selectedPromo,
  isLowStock,
  setIsLowStock,
  isOutOfStock,
  setIsOutOfStock,
}) {
  const [dateInput, setDateInput] = useState("");
  const [altInput, setAltInput] = useState("");
  const [inStockDate, setInStockDate] = useState([]);
  const [altOption, setAltOption] = useState([]);

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
      try {
        axios.put(
          `https://dull-pink-termite-slip.cyclic.app/toggle-lowStock/${productData.Item_Number}`,
          {
            Alt: altInput,
          }
        );
        if (response.status === 200) {
          console.log("Alternative options updated");
          setAltOption([...altOption, altInput]);
          setAltInput("");
          onUpdate(); // Call the onUpdate function with appropriate arguments
        }
      } catch (error) {
        console.error("Error updating alternative options:", error);
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
      try {
        axios.put(
          `https://dull-pink-termite-slip.cyclic.app/toggle-oos/${productData.Item_Number}`,
          { Date: dateInput }
        );
        if (response.status === 200) {
          console.log("Date added successfully");
          setInStockDate([...inStockDate, dateInput]);
          setDateInput("");
          onUpdate(); // Call the onUpdate function with appropriate arguments
        }
      } catch (error) {
        console.error("Error adding date:", error);
      }
    } else {
      alert("Fetching the initial value... Please wait.");
    }
  };

  console.log(isLowStock);

  return (
    <div id="stock-buttons">
      <label>Promo Item</label>
      <input type="checkbox" />
      <div>
        <label>Missing components</label>
        <input
          type="checkbox"
          checked={isLowStock === true}
          onChange={handleLowStockCheckboxChange}
        />
        <div>
          <form onSubmit={handleLowStockCheckboxChange}>
            <label>Alternative options: </label>
            <input
              type="text"
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
            />
            <button type="submit">Submit</button>
            <ul>
              {" "}
              {altOption.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </form>
        </div>
      </div>

      <label> Out of Stock</label>
      <input
        type="checkbox"
        checked={isOutOfStock === true}
        onChange={handleOutOfStockCheckboxChange}
      />
      <div>
        <form onSubmit={handleOutOfStockCheckboxChange}>
          <label>Estimated In Stock Date: </label>
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button type="submit">Submit</button>
          <ul>
            {inStockDate.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default StockButtons;
