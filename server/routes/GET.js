const express = require("express");
const router = express.Router();
const PricingModel = require("../models/pricing");
const InfoModel = require("../models/info");
const Eurofit = require("../models/eurofits");
const mediaModel = require("../models/media");

router.get("/pricing/:criteria/:item", async (req, res) => {
  try {
    const criteria = req.params.criteria;
    const itemValue = req.params.item;
    let query = {};

    // Define the query based on the criteria
    if (criteria === "item_number") {
      query.Item_Number = itemValue.trim();
    } else if (criteria === "name") {
      query.Name = itemValue.trim();
    } else if (criteria === "url") {
      query.url = itemValue.trim();
    } else {
      return res.status(400).json({ message: "Invalid search criteria" });
    }

    const pricingDoc = await PricingModel.findOne(query);
    // const pricingDoc = await PricingModel.findOne({
    //   Item_Number: pricingItem.trim(), // Trim whitespace including newlines
    // });

    if (!pricingDoc) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    const pricingArrays = pricingDoc.Pricing; // Extract the Pricing arrays

    res.json(pricingArrays);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Get Internal Information
router.get("/info", async (req, res) => {
  try {
    const itemInfo = req.query.item;
    const info = await InfoModel.findOne({
      Item_Number: itemInfo.trim(),
    });
    console.log(info);

    if (!info) {
      return res.status(404).json({ message: "Internal Info not found" });
    }

    res.json(info);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get Eurofit info
router.get("/eurofits", async (req, res) => {
  try {
    const itemNumber = parseInt(req.query.item);

    if (isNaN(itemNumber)) {
      return res.status(400).json({ message: "Invalid Item_Number provided" });
    }

    const info = await Eurofit.findOne({
      Item_Number: itemNumber,
    });

    if (!info) {
      return res.status(404).json({ message: "Eurofit Info not found!" });
    }

    console.log("Query:", info);

    res.json(info);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/mediaspecs", async (req, res) => {
  try {
    const media = req.query.item;
    const mediaInfo = await mediaModel.find({
      Type: media,
    });
    console.log(mediaInfo);
    res.json(mediaInfo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
