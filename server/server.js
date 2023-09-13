const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const { GridFSBucket } = require("mongodb");
const multer = require("multer");

//imports

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

// app.use(express.static("public"));
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders:
    "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token",
  credentials: true,
  preflightContinue: false,
  optionSuccessStatus: 204,
};
app.use(cors(corsOptions));

//////////////////////////////////////////////////////////////////////////////////////////////////
//GridFS

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const bucket = new GridFSBucket(mongoose.connection.db);
  const file = req.file; // Assuming you're sending the file in the request body

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const uploadStream = bucket.openUploadStream(file.originalname);

  // You can directly use the file buffer here
  uploadStream.end(file.buffer);

  // uploadStream.on("finish", () => {
  //   res.status(201).json({ message: "File uploaded successfully" });
  // });

  uploadStream.on("error", (error) => {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File upload failed" });
  });
});

// Download a file from GridFS
app.get("/download/:filename", (req, res) => {
  const bucket = new GridFSBucket(mongoose.connection.db);
  const { filename } = req.params;

  const downloadStream = bucket.openDownloadStreamByName(filename);

  downloadStream.on("error", (error) => {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "File download failed" });
  });

  downloadStream.pipe(res);
});
//////////////////////////////////////////////////////////////////////////////////////////////////
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
//Additional Eurofit Info

const EuroSchema = new mongoose.Schema({
  Name: String,
  Item_Number: String,
  Measurements: String,
  Additional_Information: String,
});

const EuroModel = mongoose.model("Eurofits", EuroSchema);

app.get("/info/eurofits", async (req, res) => {
  try {
    const euroInfo = req.query.item;
    const info = await EuroModel.findOne({
      Item_Number: euroInfo,
    });
    console.log(info);

    if (!info) {
      return res.status(404).json({ message: "Internal Info not found!" });
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

//post requests

app.post("/add", async (req, res) => {
  try {
    const { Item_Number, Name, Description, Keywords, Category, SubCategory } =
      req.body;

    const newItem = new items({
      Item_Number,
      Name,
      Description,
      Keywords,
      Category,
      SubCategory,
    });
    await newItem.save();
    res.sendStatus(201);
  } catch (error) {
    console.error("error adding item");
    res.status(500).json({ message: "error adding item", error });
  }
});

//add the item pricing
// Add the item pricing along with Item_Number and Name
app.post("/pricingAdd", async (req, res) => {
  try {
    const { Item_Number, Name, Pricing } = req.body;

    // Check if an item with the given Item_Number already exists
    let existingItem = await PricingModel.findOne({ Item_Number });

    if (existingItem) {
      return res.status(400).json({ message: "Item already exists" });
    }

    // Create a new item document
    const newItem = new PricingModel({
      Item_Number,
      Name,
      Pricing,
    });

    // Save the new item to the database
    await newItem.save();

    res.status(201).json({ message: "Item pricing added successfully" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding item pricing:", error);

    // Return an error response
    return res
      .status(500)
      .json({ message: "Error adding item pricing", error: error.message });
  }
});

//put requests
//update the general item info
app.put("/update/:itemNumber", async (req, res) => {
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
    // if ("Keywords" in req.body)
    //   itemToUpdate.Keywords += " " + req.body.Keywords;

    await itemToUpdate.save();

    return res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);

    return res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
});

app.put("/update/pricing/:itemNumber", async (req, res) => {
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

//Delete
app.delete("/delete/:itemNumber", async (req, res) => {
  try {
    let itemToDelete = req.params.itemNumber;

    await items.findOneAndDelete({ Item_Number: itemToDelete });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.sendStatus(201);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Could not delete item", error });
  }
});

// app.delete("/delete/pricing/:itemNumber", async (req, res) => {
//   try {
//     let priceToDelete = req.params.itemNumber;
//     let elementToDelete = req.body.elementToDelete;

//     await PricingModel.updateOne(
//       { Item_Number: priceToDelete },
//       {
//         $pull: {
//           pricing: elementToDelete,
//         },
//       }
//     );

//     res.sendStatus(201);
//   } catch (error) {
//     console.error("Error deleting item", error);
//     restart.status(500).json({ message: "could not delete item", error });
//   }
// });

/////////////////////////////////////////
//additional item info requests

app.get("");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
