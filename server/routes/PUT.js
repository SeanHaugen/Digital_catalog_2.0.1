const express = require("express");
const router = express.Router();
const PricingModel = require("../models/pricing");

const items = require("../models/item");

router.put("/update/:itemNumber", async (req, res) => {
  console.log("Received PUT request:", req.body);
  const itemNumber = req.params.itemNumber;

  try {
    // Find the item by its Item_Number
    let itemToUpdate = await items.findOne({ Item_Number: itemNumber });

    if (!itemToUpdate) {
      return res.status(404).json({ message: "Item not found" });
    }

    // if ("Name" in req.body) itemToUpdate.Name = req.body.Name;
    // if ("Category" in req.body) itemToUpdate.Category = req.body.Category;
    // if ("SubCategory" in req.body)
    //   itemToUpdate.SubCategory = req.body.SubCategory;
    if ("Description" in req.body)
      itemToUpdate.Description += " " + req.body.Description;
    if ("Materials" in req.body)
      itemToUpdate.Materials += " " + req.body.Materials;
    if ("Package_Weight" in req.body)
      itemToUpdate.Package_Weight += " " + req.body.Package_Weight;
    if ("Imprint_Method" in req.body)
      itemToUpdate.Imprint_Method += " " + req.body.Imprint_Method;
    if ("Imprint_Method" in req.body)
      itemToUpdate.Imprint_Method += " " + req.body.Imprint_Method;

    await itemToUpdate.save();

    return res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);

    return res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
});

router.put("/update/pricing/:itemNumber", async (req, res) => {
  try {
    const priceToUpdate = req.params.itemNumber;
    const elementToUpdate = req.body.elementToUpdate;

    await PricingModel.updateOne(
      { Item_Number: priceToUpdate, Pricing: { $elemMatch: elementToUpdate } },
      {
        $set: {
          "Pricing.$": elementToUpdate,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating item", error);
    res.status(500).json({ message: "Could not update item", error });
  }
});

module.exports = router;
