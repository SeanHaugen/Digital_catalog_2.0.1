const mongoose = require("mongoose");

const eurofitSchema = new mongoose.Schema({
  Measurements: String,
  Name: String,
  Item_Number: Number,
  Additional_Information: String,
});

export const Eurofit = mongoose.model("Eurofits", eurofitSchema);
