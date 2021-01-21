var multer = require("multer")
var path = require("path");
//multer.diskStorage() creates a storage space for storing files.
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype === "video/mp4" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, path.join(__dirname, "../files"));
      } else {
        cb({ message: "This file is invalid." }, false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
module.exports = {
  videoUpload: multer({ storage: videoStorage })
};