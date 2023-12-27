import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
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

  const renderAdditionalInfoList = () => {
    return additionalInfoList.map((info, index) => (
      <ul key={index}>
        <li>{info}</li>
      </ul>
    ));
  };

  return (
    <div>
      <Item>
        <h2>Group Knowledge</h2>
        {eurofitSlice}
        {/* {renderAdditionalInfoList()} */}
        {productData.additional_info.map((info, index) => {
          return (
            <ul key={index}>
              <li>{info}</li>
            </ul>
          );
        })}
        <form onSubmit={handleFormSubmit}>
          <label>
            Additional Info:
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <Button color="success" type="submit">
            {isUpdating
              ? "Update Additional Info"
              : "Add Additional Info & remove old info"}
          </Button>
        </form>
        <Button onClick={() => setIsUpdating(!isUpdating)}>
          {isUpdating ? "Switch to Add Mode" : "Switch to Update Mode"}
        </Button>
      </Item>
    </div>
  );
}

export default AdditionalInfo;
