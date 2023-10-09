const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
//request imports
const getRoutes = require("./routes/GET");
const putRoutes = require("./routes/PUT");
const deleteRoutes = require("./routes/DELETE");
const postRoutes = require("./routes/POST");

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

// app.use(express.static("public"));
app.use(express.json());
app.use("/get", getRoutes);
app.use("/put", putRoutes);
app.use("/post", postRoutes);
app.use("/delete", deleteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//TO DO:
//additional info -parades and floats

//stands and furniture

//additional item info requests
