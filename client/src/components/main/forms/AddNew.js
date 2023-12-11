import React, { useState } from "react";
import axios from "axios";

function AddNew({ productData }) {
  const [formData, setFormData] = useState({
    Item_Number: "",
    Name: "",
    Description: "",
    Keywords: "",
    Category: "",
    SubCategory: "",
    Colors: "",
    Product_Width_inches: "",
    Product_Height_Inches: "",
    Produce_Depth_Inches: "",
    Artwork_Required: "",
    Package_Size: "",
    Package_Weight: "",
    Product_Weight: "",
    Kit_Includes: "",
    Materials: "",
    Imprint_Method: "",
    Origin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://dull-pink-termite-slip.cyclic.app/add",
        formData
      ); // Assuming your React app is running on the same domain as the server

      // Clear the form or show a success message
      setFormData({
        Item_Number: "",
        Name: "",
        Description: "",
        Keywords: "",
        Category: "",
        SubCategory: "",
        Colors: "",
        Product_Width_inches: "",
        Product_Height_Inches: "",
        Produce_Depth_Inches: "",
        Artwork_Required: "",
        Package_Size: "",
        Package_Weight: "",
        Product_Weight: "",
        Kit_Includes: "",
        Materials: "",
        Imprint_Method: "",
        Origin: "",
      });

      console.log("Item added successfully");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Item</h1>
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
      <input
        type="text"
        name="Colors"
        placeholder="Colors"
        value={formData.Colors}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Product_Width_inches"
        placeholder="Product_Width_inches"
        value={formData.Product_Width_inches}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Product_Height_Inches"
        placeholder="Product_Height_Inches"
        value={formData.Product_Height_Inches}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Produce_Depth_Inches"
        placeholder="Produce_Depth_Inches"
        value={formData.Produce_Depth_Inches}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Artwork_Required"
        placeholder="Artwork_Required"
        value={formData.Artwork_Required}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Package_Size"
        placeholder="Package_Size"
        value={formData.Package_Size}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Package_Weight"
        placeholder="Package_Weight"
        value={formData.Package_Weight}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Product_Weight"
        placeholder="Product_Weight"
        value={formData.Product_Weight}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Kit_Includes"
        placeholder="Kit_Includes"
        value={formData.Kit_Includes}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Materials"
        placeholder="Materials"
        value={formData.Materials}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Imprint_Method"
        placeholder="Imprint_Method"
        value={formData.Imprint_Method}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Origin"
        placeholder="Origin"
        value={formData.Origin}
        onChange={handleChange}
      />

      {/* <label>
        Promo Item:
        <input
          type="checkbox"
          name="IsPromoItem"
          checked={formData.IsPromoItem}
          onChange={handleChange}
        />
      </label> */}
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddNew;
