const mongoose = require("mongoose");

const PromoItemSchema = new mongoose.Schema({
  Item_Number: {
    type: Number,
    required: false,
  },
  Name: {
    type: String,
    required: false,
  },
});

const PromoItemModel = mongoose.model("PromoItem", PromoItemSchema);

module.exports = PromoItemModel;
