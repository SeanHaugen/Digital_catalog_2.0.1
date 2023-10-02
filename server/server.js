const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
//requests
const getRoutes = require("./routes/GET");
const putRoutes = require("./routes/PUT");

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
  })
  .then(() => {
    console.log("Connected to MongoDB!!");
  });

const port = process.env.PORT || 4000;

// app.use(express.static("public"));
app.use(express.json());
// app.use("/pricing", getRoutes);
app.use("/get", getRoutes);
app.use("/put", putRoutes);

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

//additional info -parades and floats

//stands and furniture

/////////////////////////////////////////////////////////////////////////////////////////////

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
    if ("Materials" in req.body)
      itemToUpdate.Materials += " " + req.body.Materials;
    if ("Package_Weight" in req.body)
      itemToUpdate.Package_Weight += " " + req.body.Package_Weight;
    if ("Imprint_Method" in req.body)
      itemToUpdate.Imprint_Method += " " + req.body.Imprint_Method;
    if ("Imprint_Method" in req.body)
      itemToUpdate.Imprint_Method += " " + req.body.Imprint_Method;

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
