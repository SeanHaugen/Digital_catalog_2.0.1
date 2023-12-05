import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
// import { useHandleUpdatePricing } from "../../../../api/api";

function EditPricing({ productData }) {
  // const [itemNumber, setItemNumber] = useState(productData.Item_Number);
  const [openPriceEdit, setOpenPriceEdit] = useState(false);
  const [outerIndex, setOuterIndex] = useState("");
  const [innerIndex, setInnerIndex] = useState("");
  const [updatedElement, setUpdatedElement] = useState("");

  const handlePriceEdit = () => {
    setOpenPriceEdit(!openPriceEdit);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.put(
        `https://dull-pink-termite-slip.cyclic.app/update/pricing/${productData.Item_Number}`,
        {
          outerIndex: outerIndex,
          innerIndex: innerIndex,
          updatedElement: updatedElement,
        }
      );

      if (response.status === 200) {
        console.log("Pricing updated successfully");
        // Handle success, e.g., show a success message to the user
      }
    } catch (error) {
      console.error("Error updating item", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const outerIndexOptions = [
    { label: "Retail", value: 0 },
    { label: "Net", value: 1 },
    { label: "CPP1CS", value: 2 },
    { label: "KEY2CS", value: 3 },
    { label: "INP3CS", value: 4 },
  ];
  const innerIndexOptions = [
    { label: "QTY 1", value: 1 },
    { label: "QTY 2-5", value: 2 },
    { label: "QTY 6-11", value: 3 },
    { label: "QTY 12-24", value: 4 },
  ];

  return (
    <div>
      <Stack
        spacing={1}
        style={{
          width: "20%",
          display: "flex",
          flexFlow: "column wrap",
        }}
      >
        {!openPriceEdit ? (
          <Button onClick={handlePriceEdit}>Edit Pricing</Button>
        ) : (
          <>
            <Select
              value={outerIndex}
              onChange={(e) => setOuterIndex(e.target.value)}
              style={{ height: "30px" }}
            >
              <Option value="">Select Row</Option>
              {outerIndexOptions.map((option, index) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Select
              value={innerIndex}
              onChange={(e) => setInnerIndex(e.target.value)}
              style={{ height: "30px" }}
            >
              <Option value="">Select column</Option>
              {innerIndexOptions.map((option, index) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Input
              type="text"
              placeholder="new price"
              value={updatedElement}
              onChange={(e) => setUpdatedElement(e.target.value)}
            />
            <Button onClick={handleFormSubmit}>Update Pricing</Button>
            <Button variant="outlined" onClick={handlePriceEdit}>
              Close
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
}

export default EditPricing;
