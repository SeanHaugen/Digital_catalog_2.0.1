import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Form({ productData, editing, setEditing, toggleEditing }) {
  console.log(productData.Item_Number);
  const [description, setDescription] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  // Define and initialize the 'editing' state

  useEffect(() => {
    // Load the current description when the component mounts
    setDescription(productData.Description);
  }, [productData.Description]);

  const handleUpdate = async () => {
    try {
      // Send the edited portion to the server
      const response = await axios.put(
        `https://dull-pink-termite-slip.cyclic.app/update/${productData.Item_Number}`,
        { Description: editedDescription }
      );

      if (response.status === 200) {
        console.log("Description updated");
        setDescription(editedDescription);
        toggleEditing();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {editing ? (
        <div>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Description</button>
          <button onClick={toggleEditing}>End Editing</button>
        </div>
      ) : (
        <div>
          <p>{description}</p>
          <button onClick={toggleEditing}>Edit Description</button>
        </div>
      )}
    </div>
  );
}
export default Form;
