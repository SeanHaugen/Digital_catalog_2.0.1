import React, { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "../../../../helper/Item";

function Description({ productData }) {
  console.log(productData.Description);

  const [editing, setEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(
    productData.Description
  );

  const description = productData.Description || "";

  const descriptionBullets = description
    .split(/[.!?]/)
    .filter((sentence) => sentence.trim() !== "");

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://dull-pink-termite-slip.cyclic.app/update/${productData.Item_Number}`,
        { Description: editDescription }
      );

      if (response.status === 200) {
        console.log("Description updated");
        description = editDescription;
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
            type="text"
            value={editDescription}
            onChange={handleDescriptionChange}
            rows={4}
            cols={50}
          />
          <button onClick={handleUpdate}>Update Description</button>
          <button onClick={toggleEditing}>End Editing</button>
        </div>
      ) : (
        <div>
          <ul>
            {descriptionBullets.map((point, index) => (
              <li
                key={index}
                style={{
                  fontSize: "16px",
                  fontStyle: index === 0 ? "italic" : "normal",
                  listStyleType: index === 0 ? "none" : "disc",
                }}
              >
                {point}
              </li>
            ))}
          </ul>
          <button onClick={toggleEditing}>Edit Description</button>
        </div>
      )}
    </div>
  );
}

export default Description;
