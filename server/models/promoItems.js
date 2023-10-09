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
  Category: {
    type: String,
    required: false,
  },
  SubCategory: {
    type: String,
    required: false,
  },
  Description: {
    type: String,
    required: false,
  },
  Keywords: {
    type: String,
    required: false,
  },
});

PromoItemSchema.index({
  Name: "text",
  Category: "text",
  SubCategory: "text",
  Description: "text",
  Keywords: "text",
});

const PromoItemModel = mongoose.model("PromoItem", PromoItemSchema);

module.exports = PromoItemModel;
