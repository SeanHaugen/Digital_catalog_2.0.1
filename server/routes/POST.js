const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { Item_Number, Name, Description, Keywords, Category, SubCategory } =
      req.body;

    const newItem = new items({
      Item_Number,
      Name,
      Description,
      Keywords,
      Category,
      SubCategory,
    });
    await newItem.save();
    res.sendStatus(201);
  } catch (error) {
    console.error("error adding item");
    res.status(500).json({ message: "error adding item", error });
  }
});

router.post("/pricingAdd", async (req, res) => {
  try {
    const { Item_Number, Name, Pricing } = req.body;

    // Check if an item with the given Item_Number already exists
    let existingItem = await PricingModel.findOne({ Item_Number });

    if (existingItem) {
      return res.status(400).json({ message: "Item already exists" });
    }

    // Create a new item document
    const newItem = new PricingModel({
      Item_Number,
      Name,
      Pricing,
    });

    // Save the new item to the database
    await newItem.save();

    res.status(201).json({ message: "Item pricing added successfully" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding item pricing:", error);

    // Return an error response
    return res
      .status(500)
      .json({ message: "Error adding item pricing", error: error.message });
  }
});

module.exports = router;
