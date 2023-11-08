import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useHandleEurofitInfo } from "../../../../api/api";
import { Item } from "../../../../helper/Item";

function AdditionalInfo({ productData }) {
  const [eurofitInfo, setEurofitInfo] = useState([]);
  useHandleEurofitInfo(setEurofitInfo, productData.Item_Number);
  let eurofitObj = eurofitInfo;
  let eurofitArray = Object.entries(eurofitObj).map(([key, value], index) => (
    <ul key={index}>
      <li>{value}</li>
    </ul>
  ));
  let eurofitSlice = eurofitArray.splice(1, 2);

  const [input, setInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [additionalInfoList, setAdditionalInfoList] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isUpdating) {
        // Use PUT request for updating
        response = await axios.put(
          `https://dull-pink-termite-slip.cyclic.app/additionalInfoEdit/${productData.Item_Number}`,
          {
            additional_info: input,
          }
        );
      } else {
        // Use POST request for adding
        response = await axios.post(
          `https://dull-pink-termite-slip.cyclic.app/additionalInfo/${productData.Item_Number}`,
          {
            additional_info: input,
          }
        );
      }

      if (response.status === 200) {
        console.log(
          isUpdating ? "Additional info updated" : "Additional info added"
        );

        setAdditionalInfoList([...additionalInfoList, input]);
        // Reset the form
        setInput("");
        // Trigger a callback to notify the parent component of the update
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating or adding additional info", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  console.log(productData.additional_info);

  return (
    <div>
      <Item>
        <p>
          This tab is meant for all of the "tribal" knowledge that accumulates
          with our products.{" "}
        </p>
        <p>
          If there is a piece of information that you find out about a product
          let an admin know and we can add that info here for all to have.
        </p>
        {eurofitSlice}
        {productData.additional_info}
        <form onSubmit={handleFormSubmit}>
          <label>
            Additional Info:
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button type="submit">
            {isUpdating
              ? "Update Additional Info"
              : "Add Additional Info & remove old info"}
          </button>
        </form>
        <button onClick={() => setIsUpdating(!isUpdating)}>
          {isUpdating ? "Switch to Add Mode" : "Switch to Update Mode"}
        </button>
      </Item>
    </div>
  );
}

export default AdditionalInfo;
