import Box from "@mui/material/Box";
import React from "react";
import axios from "axios";

function Form({
  editing,
  toggleEditing,
  productData,
  editDescription,
  setEditDescription,
  handleDescriptionChange,
}) {
  console.log(productData.Item_Number);

  const handleUpdateDescription = async () => {
    try {
      // Prepare the updated data
      const updatedData = {
        description: editDescription,
      };

      // Perform the PUT request to update the description
      const response = await axios.put(
        `http://ivory-firefly-hem.cyclic.app/update/${productData.Item_Number}`,
        updatedData
      );

      // Handle response if needed
      console.log(response);

      // Update the local state with the edited description
      setEditDescription(updatedData.description);

      // Toggle off editing mode after successful update
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
            <textarea
              value={editDescription}
              onChange={handleDescriptionChange}
              rows={4}
              cols={50}
            />
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
