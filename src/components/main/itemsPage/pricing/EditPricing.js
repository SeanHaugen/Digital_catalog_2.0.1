import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
// import { useHandleUpdatePricing } from "../../../../api/api";
import "./EditPricing.css";

function EditPricing({ productData }) {
  // const [itemNumber, setItemNumber] = useState(productData.Item_Number);
  const [outerIndex, setOuterIndex] = useState("");
  const [innerIndex, setInnerIndex] = useState("");
  const [updatedElement, setUpdatedElement] = useState("");
  const [isEditingOpen, setIsEditingOpen] = useState(false);

  const handleToggleEditing = () => {
    setIsEditingOpen((prevIsEditingOpen) => !prevIsEditingOpen);
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
    <div className="form-container">
      <Button onClick={handleToggleEditing}>
        {isEditingOpen ? "Close Editing" : "Open Editing"}
      </Button>
      {isEditingOpen && (
        <div>
          <select
            className="custom-select"
            value={outerIndex}
            onChange={(e) => setOuterIndex(e.target.value)}
          >
            <option value="">Select Row</option>
            {outerIndexOptions.map((option, index) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="custom-select"
            value={innerIndex}
            onChange={(e) => setInnerIndex(e.target.value)}
          >
            <option value="">Select column</option>
            {innerIndexOptions.map((option, index) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            className="custom-input"
            type="text"
            placeholder="new price"
            value={updatedElement}
            onChange={(e) => setUpdatedElement(e.target.value)}
          />
          <Button
            className="custom-button"
            // variant="contained"
            // color="success"
            onClick={handleFormSubmit}
          >
            Update Pricing
          </Button>
        </div>
      )}
    </div>
  );
}

// function EditPricing({ productData, initialPricing }) {
//   const [elementIndex, setElementIndex] = useState(0);
//   const [updatedElement, setUpdatedElement] = useState([""]);

//   const handleElementIndexChange = (e) => {
//     setElementIndex(parseInt(e.target.value, 10)); // Parse to integer
//     setUpdatedPrice(""); // Reset the price input when changing elements
//   };

//   const handleUpdatedElementChange = (e, index) => {
//     const updatedElementCopy = [...updatedElement];
//     updatedElementCopy[index] = e.target.value;
//     setUpdatedElement(updatedElementCopy);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `https://dull-pink-termite-slip.cyclic.app//update/pricing/${productData.Item_Number}`,
//         {
//           elementIndex,
//           updatedElement,
//         }
//       );

//       if (response.status === 200) {
//         console.log("Pricing updated successfully");
//       } else {
//         console.error("Failed to update pricing");
//       }
//     } catch (error) {
//       console.error("Error updating pricing", error);
//     }
//   };

//   console.log(initialPricing);

//   return (
//     <div>
//       <h2>Edit Pricing</h2>
//       <div>
//         <label>Item Number:</label>
//         <span>{productData.Item_Number}</span>
//       </div>
//       <div>
//         <label>Element Index:</label>
//         <select value={elementIndex} onChange={handleElementIndexChange}>
//           {initialPricing.map((price, index) => (
//             <div>
//               <option key={index} value={index}>
//                 Element {index}
//               </option>
//             </div>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Updated Price:</label>
//         <input
//           type="text"
//           value={updatedElement} // Display the existing price for editing
//           onChange={handleUpdatedElementChange}
//         />
//       </div>
//       <button onClick={handleSave}>Save Pricing</button>
//     </div>
//   );
// }

// const handleSave = async () => {
//   try {
//     const response = await axios.put(
//       `https://dull-pink-termite-slip.cyclic.app/update/pricing/${productData.Item_Number}`,
//       {
//         elementIndex,
//         updatedElement, // Send the updated price
//       }
//     );

//     if (response.status === 200) {
//       console.log("Pricing updated successfully");
//     } else {
//       console.error("Failed to update pricing");
//     }
//   } catch (error) {
//     console.error("Error updating pricing", error);
//   }
// };

export default EditPricing;
