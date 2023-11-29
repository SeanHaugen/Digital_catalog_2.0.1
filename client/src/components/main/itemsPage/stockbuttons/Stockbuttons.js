import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
// import { useUpdateLowStock } from "../../../../api/api";
// import { useUpdateOOS } from "../../../../api/api";
import { fetchLowStockValue } from "../../../../api/api";
import { fetchOOSValue } from "../../../../api/api";

function StockButtons({
  productData,
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

    // fetchOOSValue(productData.Item_Number).then((value) => {
    //   setIsOutOfStock(value);
    // });
  }, [productData.Item_Number]);

  useEffect(() => {
    console.log("Fetching initial value...");
    fetchOOSValue(productData.Item_Number).then((value) => {
      setIsOutOfStock(value);
    });
  }, [productData.Item_Number]);

  const handleLowStockCheckboxChange = async () => {
    if (isLowStock !== null) {
      const newIsLowStock = !isLowStock;
      setIsLowStock(newIsLowStock);

      // Send a PUT request to your server to toggle Low_Stock
      try {
        const response = await axios.put(
          `https://dull-pink-termite-slip.cyclic.app/toggle-lowStock/${productData.Item_Number}`
        );
        if (response.status === 200) {
          // Make sure to call the onUpdate function if needed
          // onUpdate && onUpdate();
          setIsLowStock(response.data.Low_Stock);
        }
      } catch (error) {
        console.error("Error updating alternative options:", error);
        // Handle the error
      }
    }
  };

  const handleToggleOutOfStock = async () => {
    try {
      // Replace 'yourItemNumber' with the actual item number or retrieve it dynamically
      const itemNumber = productData.Item_Number;

      const response = await axios.put(
        `https://dull-pink-termite-slip.cyclic.app/toggle-oos/${itemNumber}`
      );

      setIsOutOfStock(response.data.OOS);
    } catch (error) {
      console.error("Error toggling out-of-stock status:", error);
    }
  };

  console.log(isLowStock);

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
      <hr />
      <h3>Stock info</h3>
      <div>
        <label>Missing components</label>
        <Checkbox
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
            <Button type="submit">Submit</Button>
            <ul>
              {productData.Alt
                ? productData.Alt.map((option, index) => (
                    <div>
                      <li key={index}>{option}</li>
                      <Button
                        type="button"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleDeleteAltOption(productData.Item_Number, option)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  ))
                : null}
            </ul>
          </form>
        </div>
      </div>

      <label> Out of Stock</label>
      <Checkbox
        type="checkbox"
        checked={isOutOfStock === true}
        onChange={handleToggleOutOfStock}
      />
      {/* <button onClick={handleToggleOutOfStock}>Toggle Out of Stock</button> */}

      <div>
        <form onSubmit={handleInStockDate}>
          <label>Estimated In Stock Date: </label>
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
          <ul>
            {productData.Date && <li>{productData.Date}</li>}

            {productData.Date && (
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={handleDeleteDate}
              >
                Remove OOS Date
              </Button>
            )}
          </ul>
        </form>
        <hr />
      </div>
    </div>
  );
}

export default StockButtons;
