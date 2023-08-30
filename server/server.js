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

//////////////////////////////////////////////////////////////////////////////////////////////////
//Pricing

const PricingSchema = new mongoose.Schema({
  url: String,
  Name: String,
  Item_Number: String,
  Pricing: [
    [String, String, String, String, String],
    [String, String, String, String, String],
    // ... continue defining the structure of the Pricing array
  ],
});

const PricingModel = mongoose.model("itempricing", PricingSchema);

app.get("/pricing/:item", async (req, res) => {
  try {
    const pricingItem = req.params.item;
    const pricingDoc = await PricingModel.findOne({
      Item_Number: pricingItem.trim(), // Trim whitespace including newlines
    });

    if (!pricingDoc) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    const pricingArrays = pricingDoc.Pricing; // Extract the Pricing arrays

    res.json(pricingArrays);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
//Internal Information

const InfoSchema = new mongoose.Schema({
  url: String,
  Name: String,
  Item_Number: String,
  Pricing: [String],
});

const InfoModel = mongoose.model("internalinfos", InfoSchema);

app.get("/info", async (req, res) => {
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

/////////////////////////////////////////////////////////////////////////////////////////////
//Flat Rate Shipping info

const flatRateSchema = new mongoose.Schema({
  Item_Number: Number,
  Service: String,
  Rate: Number,
});

const flatRateModel = mongoose.model("flatrateshippings", flatRateSchema);

app.get("/flatRates/:item", async (req, res) => {
  try {
    const flatRateItem = req.params.item;
    const rateInfo = await flatRateModel.find({
      Item_Number: flatRateItem,
      Service: { $in: ["GROUND SERVICE", "2DAY", "STANDARD OVERNIGHT"] },
    });
    console.log(rateInfo);
    if (rateInfo.length === 0) {
      return res.status(404).json({ message: "Internal Info not found" });
    }
    res.json(rateInfo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////
//Item Information/details

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

const items = mongoose.model("items", itemSchema);

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
  const productCategory = req.params.items;

  try {
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
  const itemNumber = req.query.item;
  try {
    const item = await items.findOne({ Item_Number: itemNumber });
    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/search", async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const numericQuery = parseFloat(searchQuery);
    let results;

    if (!isNaN(numericQuery)) {
      results = await items.find({ Item_Number: numericQuery });
    } else {
      results = await items
        .find(
          {
            $text: { $search: searchQuery },
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

//put requests

app.put("/items/:itemNumber", async (req, res) => {
  const itemNumber = req.params.itemNumber;

  try {
    let itemToUpdate = await items.findOne({ Item_Number: itemNumber });

    if (!itemToUpdate) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the fields if they exist in the request body
    if (req.body.Name) itemToUpdate.Name = req.body.Name;
    if (req.body.Category) itemToUpdate.Category = req.body.Category;
    if (req.body.SubCategory) itemToUpdate.SubCategory = req.body.SubCategory;
    if (req.body.Description) itemToUpdate.Description = req.body.Description;
    if (req.body.Keywords) itemToUpdate.Keywords = req.body.Keywords;

    await itemToUpdate.save();
    return res.status(200).json({ message: "Item updated" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating item" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
