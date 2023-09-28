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
