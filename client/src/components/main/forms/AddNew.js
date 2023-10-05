import React, { useState } from "react";
import axios from "axios";

function AddNew() {
  const [formData, setFormData] = useState({
    Item_Number: "",
    Name: "",
    Description: "",
    Keywords: "",
    Category: "",
    SubCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://ivory-firefly-hem.cyclic.app/add", formData); // Assuming your React app is running on the same domain as the server

      // Clear the form or show a success message
      setFormData({
        Item_Number: "",
        Name: "",
        Description: "",
        Keywords: "",
        Category: "",
        SubCategory: "",
      });

      console.log("Item added successfully");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new Item</h1>
      <input
        type="number"
        name="Item_Number"
        placeholder="Item Number"
        value={formData.Item_Number}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Name"
        placeholder="Name"
        value={formData.Name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Description"
        placeholder="Description"
        value={formData.Description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Keywords"
        placeholder="Keywords"
        value={formData.Keywords}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Category"
        placeholder="Category"
        value={formData.Category}
        onChange={handleChange}
      />
      <input
        type="text"
        name="SubCategory"
        placeholder="SubCategory"
        value={formData.SubCategory}
        onChange={handleChange}
      />
      <label>
        Promo Item:
        <input
          type="checkbox"
          name="IsPromoItem"
          checked={formData.IsPromoItem}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddNew;
