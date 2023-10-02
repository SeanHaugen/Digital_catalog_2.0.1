const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
  url: String,
  Name: String,
  Item_Number: String,
  Pricing: [String],
});

export const InfoModel = mongoose.model("internalinfos", InfoSchema);
