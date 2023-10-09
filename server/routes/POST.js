const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { Item_Number, Name, Description, Keywords, Category, SubCategory } =
      req.body;

    // Validate input data (you can add more validation logic here)
    if (!Item_Number || !Name || !Category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newItem = new items({
      Item_Number,
      Name,
      Description,
      Keywords,
      Category,
      SubCategory,
      Colors,
      Product_Width_inches,
      Product_Height_Inches,
      Produce_Depth_Inches,
      Artwork_Required,
      Package_Size,
      Package_Weight,
      Product_Weight,
      Kit_Includes,
      Materials,
      Imprint_Method,
      Origin,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    res
      .status(500)
      .json({ message: "Error adding item", error: error.message });
  }
});

router.post("/pricingAdd", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
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
      Pricing: Pricing.map((entry) => ({
        label: entry.label,
        prices: entry.prices,
      })),
    });

    // Save the new item to the database
    await newItem.save();

    console.log("Item pricing added successfully");
    res.status(201).json({ message: "Item pricing added successfully" });
  } catch (error) {
    console.error("Error adding item pricing:", error);
    res
      .status(500)
      .json({ message: "Error adding item pricing", error: error.message });
  }
});

router.post("/promo-items", async (req, res) => {
  try {
    const newItemData = req.body; // This should contain the selected item data
    const newPromoItem = new promos(newItemData);
    await newPromoItem.save();
    res.status(201).json(newPromoItem);
  } catch (error) {
    console.error("Error adding promo item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
