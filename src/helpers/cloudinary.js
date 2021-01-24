var dotenv = require("dotenv");

require("dotenv").config();
var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (movie) => {
        resolve(movie);
      },
      { resource_type: "auto" }
    );
  });
};