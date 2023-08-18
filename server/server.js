const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const NODE_ENV = "development";
const PORT = 4000;
const DATABASE_PASSWORD = "DkD0ml96WSM62TAn";
const DATABASE = `mongodb+srv://seanhaugen560:${DATABASE_PASSWORD}@cluster0.adhrbht.mongodb.net/products?retryWrites=true&w=majority`;

const DB = DATABASE;

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB!!");
  });

const port = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(cors());

const itemSchema = new mongoose.Schema({
  Item_Number: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  SubCategory: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Keywords: {
    type: String,
    required: true,
  },
});

itemSchema.index({
  Name: "text",
  Category: "text",
  SubCategory: "text",
  Description: "text",
  Keywords: "text",
});

const flatRateSchema = new mongoose.Schema({
  Item_Number: {
    type: Number,
    required: true,
  },
  Rate: {
    type: Number,
    required: true,
  },
});

flatRateSchema.index({
  Item_Number: "text",
  Rate: "text",
});

const items = mongoose.model("items", itemSchema);
const flatRate = mongoose.model("flatRateShipping", flatRateSchema);
console.log(flatRate);

app.get("/flatRate/:itemNumber", async (req, res) => {
  const itemNumber = req.params.itemNumber;
  try {
    const flatRatesForItem = await flatRate.find({ Item_Number: itemNumber });
    console.log("Found flat Rates: ", flatRatesForItem);
    res.send(flatRatesForItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error!");
  }
});

app.get("/category", async (req, res) => {
  const allItems = await items.distinct("Category");
  res.send(allItems);
});

app.get("/category/:category", async (req, res) => {
  try {
    const productCategory = req.params.category.replace(/"/g, "");
    const result = await items.aggregate([
      { $match: { Category: productCategory } },
      { $group: { _id: "$SubCategory" } },
      { $sort: { _id: 1 } },
    ]);
    const subcategories = result.map((item) => item._id);
    res.send(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error!");
  }
});

app.get("/SubCategory", async (req, res) => {
  const allItems = await items.distinct("SubCategory");
  res.send(allItems);
});

app.get("/subCategory/:items", async (req, res) => {
  const productCategory = req.params.items; // Use req.params instead of req.query

  try {
    // Find items with the specified subcategory and sort by name
    const products = await items
      .find({ SubCategory: productCategory })
      .sort({ Name: 1 });
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/items", async (req, res) => {
  const itemNumber = req.query.item; // Retrieve the itemNumber from the query parameter
  try {
    const item = await items.findOne({ Item_Number: itemNumber });
    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/search", async (req, res) => {
  const searchQuery = req.query.q; // Assuming the search term is passed as a query parameter named 'q'

  try {
    // Check if the searchQuery can be parsed to a number
    const numericQuery = parseFloat(searchQuery);
    let results;

    if (!isNaN(numericQuery)) {
      // If it's a number, perform a numeric search
      results = await items.find({ Item_Number: numericQuery });
    } else {
      // If it's not a number, perform a text search
      results = await items
        .find(
          {
            $text: { $search: searchQuery }, // Search for text match
          },
          {
            score: { $meta: "textScore" },
          }
        )
        .sort({ score: { $meta: "textScore" } });
    }

    res.json(results);
  } catch (error) {
    console.log("Error searching database");
    res
      .status(500)
      .json({ error: "An error occurred while searching the database." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
