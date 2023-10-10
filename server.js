const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");

const DATABASE_PASSWORD = "DkD0ml96WSM62TAn";
const DATABASE = `mongodb+srv://seanhaugen560:${DATABASE_PASSWORD}@cluster0.adhrbht.mongodb.net/products?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!!");
  });

const PORT = process.env.PORT || 4000;

app.use(cors());

const itemSchema = new mongoose.Schema({
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

itemSchema.index({
  Name: "text",
  Category: "text",
  SubCategory: "text",
  Description: "text",
  Keywords: "text",
});

const itemsModel = mongoose.model("items", itemSchema);

router.get("/category", async (req, res) => {
  const allItems = await itemsModel.distinct("Category");
  res.send(allItems);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
