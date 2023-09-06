import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import axios from "axios";

function Form({
  editing,
  toggleEditing,
  productData,
  editDescription,
  setEditDescription,
}) {
  console.log(productData.Item_Number);

  const handleUpdateDescription = async () => {
    try {
      // Prepare the updated data
      const updatedData = {
        Description: editDescription,
      };

      const response = await axios.put(
        `http://ivory-firefly-hem.cyclic.app/update/${productData.Item_Number}`,
        updatedData
      );
      console.log(response);
      setEditDescription(updatedData.Description);
      toggleEditing();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <div>
        {!editing ? (
          <button onClick={toggleEditing}>Edit Text</button>
        ) : (
          <div>
            <button onClick={handleUpdateDescription}>
              Update Description
            </button>
            <button onClick={toggleEditing}>End Editing</button>
          </div>
        )}
      </div>
    </Box>
  );
}

export default Form;
