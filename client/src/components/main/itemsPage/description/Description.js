import * as React from "react";
import { useState } from "react";

import Form from "../../forms/Form";
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
  return (
    <Item>
      {editing ? (
        <textarea
          type="text"
          value={editDescription}
          onChange={handleDescriptionChange}
          rows={4}
          cols={50}
        />
      ) : (
        <ul>
          {descriptionBullets.map((point, index) => {
            return (
              <li key={index} style={{ fontSize: "16px" }}>
                {point}
              </li>
            );
          })}
        </ul>
      )}
      <Form
        editing={editing}
        toggleEditing={toggleEditing}
        productData={productData}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        handleDescriptionChange={handleDescriptionChange}
      />
    </Item>
  );
}

export default Description;
