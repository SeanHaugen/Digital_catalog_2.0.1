const methodOverride = require("method-override");
const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");

const storage = new gridFsStorage({
  url: config.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, data) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

const url = config.mongoURI;
const connect = mongoose.createConnection(url, {
  useNewConnection: true,
  useUnifiedTopology: true,
});
let gfs;

connect.once("open", () => {
  gfs = new mongoose.mongo.gridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

imageRouter.route("/").post(upload.single("file"), (req, res, next) => {
  Image.findOne({ caption: req.body.caption })
    .then((image) => {
      if (image) {
        return res.status(200).json({
          success: false,
          message: "image already exists",
        });
      }
      let newImage = new Image({
        caption: req.body.caption,
        filename: req.file.filename,
        fileId: req.file.id,
      });
      newImage
        .save()
        .then((image) => {
          res.status(200).json({
            success: true,
            image,
          });
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

/////////////////////////////////////////////////////////////////////////////////////////////////
//GridFS

// const storage = multer.memoryStorage(); // Store files in memory
// const upload = multer({ storage });

// app.post("/upload", upload.array("file", 10), (req, res) => {
//   const bucket = new GridFSBucket(mongoose.connection.db);
//   const files = req.files; // Assuming you're sending the files in the request body

//   if (!files || files.length === 0) {
//     return res.status(400).json({ error: "No files provided" });
//   }

//   const uploadPromises = [];

//   files.forEach((file) => {
//     const uploadStream = bucket.openUploadStream(file.originalname, {
//       contentType: "application/pdf",
//     });

//     // You can directly use the file buffer here
//     uploadStream.end(file.buffer);

//     const fileType = file.mimetype;

//     uploadPromises.push(
//       new Promise((resolve, reject) => {
//         uploadStream.on("finish", () => {
//           resolve();
//         });

//         uploadStream.on("error", (error) => {
//           console.error("Error uploading file:", error);
//           reject(error);
//         });
//       })
//     );
//   });

//   Promise.all(uploadPromises)
//     .then(() => {
//       res.status(201).json({ message: "Files uploaded successfully" });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "File upload failed" });
//     });
// });

// // Download a file from GridFS
// app.get("/download/:filename", (req, res) => {
//   const bucket = new GridFSBucket(mongoose.connection.db);
//   const { filename } = req.params;

//   const downloadStream = bucket.openDownloadStreamByName(filename);

//   downloadStream.on("error", (error) => {
//     console.error("Error downloading file:", error);
//     res.status(500).json({ error: "File download failed" });
//   });

//   downloadStream.pipe(res);
// });
//////////////////////////////////////////////////////////////////////////////////////////////////
