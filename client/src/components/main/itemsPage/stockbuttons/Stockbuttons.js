import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
// import { useUpdateLowStock } from "../../../../api/api";
// import { useUpdateOOS } from "../../../../api/api";
import { fetchLowStockValue } from "../../../../api/api";
import { fetchOOSValue } from "../../../../api/api";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [message, setMessage] = useState(null);

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
        { Alt: altInput }
      );

      if (response.status === 200) {
        console.log("Alternative options updated");
        const updatedAltOption = [...altOption, altInput];
        setAltOption(updatedAltOption);
        setAltInput("");
        setMessage("Info added successfully");
      }
    } catch (error) {
      console.error("Error updating alternative options:", error);
      setMessage("Error updating alternative options");
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
        <label>Missing components/variants</label>
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
          ></form>
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
          <ul style={{ display: "flex" }}>
            {productData.Date && <li>{productData.Date.slice(0, 10)}</li>}

            {productData.Date && (
              <DeleteIcon
                type="button"
                variant="contained"
                color="error"
                onClick={handleDeleteDate}
              ></DeleteIcon>
            )}
          </ul>
        </form>

        <div>
          <form onSubmit={handleAlternateOptions}>
            <label>
              <h2>Alternative options/Notes: </h2>
            </label>
            <input
              type="text"
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
            />
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </form>

          {/* Render success or error message */}
          {message && <p>{message}</p>}

          <ul>
            {productData.Alt
              ? productData.Alt.map((option, index) => (
                  <div style={{ display: "flex" }} key={index}>
                    <li>{option}</li>
                    <DeleteIcon
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleDeleteAltOption(productData.Item_Number, option)
                      }
                    ></DeleteIcon>
                  </div>
                ))
              : null}
          </ul>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default StockButtons;
