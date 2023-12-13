import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

function ToggleOutdoorItem({ productData }) {
  const [isOutdoorItem, setOutdoorItem] = useState(null);

  useEffect(() => {
    setOutdoorItem(productData.Outdoor);
  }, [productData]);

  const handleOutdoorItemToggle = async () => {
    if (isOutdoorItem !== null) {
      const updatedOutdoorItem = !isOutdoorItem;
      setOutdoorItem(updatedOutdoorItem);

      // Send a PUT request to your server to toggle New_Item
      try {
        const response = await axios.put(
          `https://dull-pink-termite-slip.cyclic.app/toggle-outdoorItem/${productData.Item_Number}`
        );

        if (response.status === 200) {
          setOutdoorItem(response.data.Outdoor);
        } else {
          // If the request was successful but the status code is not 200, handle it accordingly
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error updating New Item:", error);
        // Handle the error
        setOutdoorItem(!isOutdoorItem); // Revert the state if the request fails
      }
    }
  };

  console.log(productData.New_Item);

  return (
    <>
      <div>
        <label> Outdoor Item</label>
        <Checkbox
          type="checkbox"
          checked={isOutdoorItem === true}
          onChange={handleOutdoorItemToggle}
        />
      </div>
    </>
  );
}

export default ToggleOutdoorItem;
