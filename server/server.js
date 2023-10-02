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
