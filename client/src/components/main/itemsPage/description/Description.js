import React, { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "../../../../helper/Item";

function Description({ productData }) {
  const [editing, setEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");

  const toggleEditing = () => {
    setEditDescription(productData.Description || ""); // Set the current description when starting editing
    setEditing(!editing);
  };

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://dull-pink-termite-slip.cyclic.app/update/${productData.Item_Number}`,
        { newDescription: editDescription }
      );

      if (response.status === 200) {
        console.log("Description updated");
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
            value={editDescription}
            onChange={handleDescriptionChange}
            rows={10} // Adjust the number of rows as needed
            cols={50}
          />
          <button onClick={handleUpdate}>Update Description</button>
          <button onClick={toggleEditing}>End Editing</button>
        </div>
      ) : (
        <div>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "16px" }}>
            {productData.Description}
          </pre>
          <button onClick={toggleEditing}>Edit Description</button>
        </div>
      )}
    </div>
  );
}

export default Description;
