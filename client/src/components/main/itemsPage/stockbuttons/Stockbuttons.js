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
          `https://dull-pink-termite-slip.cyclic.app/toggle-lowStock/${productData.Item_Number}`
        );
        if (response.status === 200) {
          onUpdate(); // Call the onUpdate function with appropriate arguments
        }
      } catch (error) {
        console.error("Error updating alternative options:", error);
      }
    } else {
      alert("Fetching the initial value... Please wait.");
    }
  };

  console.log(altInput);
  const handleAlternateOptions = async () => {
    try {
      const response = await axios.put(
        `https://dull-pink-termite-slip.cyclic.app/add-alt-item/${productData.Item_Number}`,
        { newAltString: altInput }
      );

      if (response.status === 200) {
        console.log("Alternative options updated");
        const updatedAltOption = [...altOption, altInput]; // Create a new array with the updated data
        setAltOption(updatedAltOption); // Update the state
        setAltInput(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error updating alternative options:", error);
    }
  };

  const handleOutOfStockCheckboxChange = () => {
    if (isOutOfStock !== null) {
      const newIsOutOfStock = !isOutOfStock;
      setIsOutOfStock(newIsOutOfStock);

      // Send a PUT request to your server to toggle Out_of_Stock
      try {
        axios.put(
          `https://dull-pink-termite-slip.cyclic.app/toggle-oos/${productData.Item_Number}`
        );
        if (response.status === 200) {
          onUpdate(); // Call the onUpdate function with appropriate arguments
        }
      } catch (error) {
        console.error("Error setting stock out", error);
      }
    }
  };

  const handleInStockDate = async () => {
    try {
      const response = await axios.put(
        `https://dull-pink-termite-slip.cyclic.app/update-date/${productData.Item_Number}`,
        { newDate: dateInput }
      );

      if (response.status === 200) {
        console.log("Date added successfully");
        setInStockDate([...inStockDate, dateInput]);
        setDateInput("");
      }
    } catch (error) {
      console.error("Error adding date: ", error);
    }
  };

  const handleDeleteDate = async () => {
    try {
      const response = await axios.delete(
        `https://dull-pink-termite-slip.cyclic.app/delete-date/${productData.Item_Number}`
      );

      if (response.status === 200) {
        // The date field has been deleted successfully
        console.log("Date deleted successfully");
        // You can update your UI or perform any other actions
      }
    } catch (error) {
      console.error("Error deleting date: ", error);
    }
  };

  const handleDeleteAltOption = async (itemNumber, altStringToRemove) => {
    try {
      const response = await axios.delete(
        `https://dull-pink-termite-slip.cyclic.app/remove-alt-item/${itemNumber}`,
        { data: { altStringToRemove } }
      );

      if (response.status === 200) {
        // The alt string has been deleted successfully
        console.log("Alt string deleted successfully");
        // You can update your UI or perform any other actions
      }
    } catch (error) {
      console.error("Error deleting alt string: ", error);
    }
  };

  console.log(productData.Alt);

  return (
    <div id="stock-buttons">
      {/* <label>Promo Item</label> */}
      {/* <input type="checkbox" /> */}
      <div>
        <label>Missing components</label>
        <input
          type="checkbox"
          checked={isLowStock === true}
          onChange={handleLowStockCheckboxChange}
        />

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAlternateOptions();
            }}
          >
            <label>Alternative options: </label>
            <input
              type="text"
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
            />
            <button type="submit">Submit</button>
            <ul>
              {productData.Alt
                ? productData.Alt.map((option, index) => (
                    <div>
                      <li key={index}>{option}</li>
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteAltOption(productData.Item_Number, option)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))
                : null}
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
        <form onSubmit={handleInStockDate}>
          <label>Estimated In Stock Date: </label>
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button type="submit">Submit</button>
          <ul>
            {productData.Date}

            <button type="button" onClick={handleDeleteDate}>
              Delete Date
            </button>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default StockButtons;
