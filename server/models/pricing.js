const mongoose = require("mongoose");

//Pricing

const PricingSchema = new mongoose.Schema({
  url: String,
  Name: String,
  Item_Number: String,
  Pricing: [
    [String, String, String, String, String],
    [String, String, String, String, String],
  ],
});

export const PricingModel = mongoose.model("itempricing", PricingSchema);
