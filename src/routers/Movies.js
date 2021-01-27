const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const auth = require('../middleware/auth')
const Movie = require("../Model/MoviesModel");
const User = require('../Model/UserModel');
const cloud = require("../helpers/cloudinary");
const upload = multer({ dest: "./src/files" });
/* Create Movie */
router.post("/upload", auth, upload.any(), async function (req, res, next) {
  var data = {
    coverpics_url: req.files[0].path,
    movie_url: req.files[1].path,
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    cast: req.body.cast,
    timestamps: Date.now(),
    owner: req.user._id
  };

if (User.role === 'admin'){
  try {
    cloud.uploads(data.coverpics_url).then((img_metadata) => {
      data.coverpics_url = img_metadata.secure_url;
      cloud.uploads(data.movie_url).then((vid_metadata) => {
        data.movie_url = vid_metadata.secure_url;
        console.log(data);

        Movie.create(data, (error, movie) => {
          if (error) {
            return res.json({
              success: false,
              error: error,
            });
          } else {
            return res.json({
              success: true,
              message: movie,
            });
          }
        });
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
} else {
  return res.json({
    success: false,
    message: "You are not authorized to access this route"
  })
}
});

/* Edit A Movie Entry*/
router.post("/edit/:id", function (req, res, next) {
  data = {
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    cast: req.body.cast,
    timestamps: Date.now(),
  };

  Movie.findByIdAndUpdate({ _id: req.params.id }, data, (error, movie) => {
    if (error) {
      return res.send({
        success: false,
        message: error,
      });
    } else {
      return res.send({
        success: true,
        message: movie,
      });
    }
  });
});

/* Get All Movies */
router.get("/", function (req, res, next) {
  Movie.find({}, (error, movie) => {
    if (error) {
      return res.send({
        success: false,
        message: error,
      });
    } else {
      return res.send({
        success: true,
        message: movie,
      });
    }
  });
});

/* Get A Movie */
router.get("/:id", function (req, res, next) {
  Movie.find({ _id: req.params.id }, (error, movie) => {
    if (error) {
      return res.send({
        success: false,
        message: error,
      });
    } else {
      return res.send({
        success: true,
        message: movie,
      });
    }
  });
});

/* Delete Movie */
router.delete("/delete/:id", (req, res, next) => {
  Movie.findOneAndDelete({ _id: req.params.id }, (error, movie) => {
    if (error) {
      return res.send({
        success: false,
        message: error,
      });
    } else {
      return res.send({
        success: true,
        message: movie,
      });
    }
  });
});

/* Search movie */
router.get("/search/movie", (req, res) => {
  var data = req.query;

  console.log(data);

  Movie.find(data)

    .then((result) => {
      console.log(result);
      res.status(200).send({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        error: err,
      });
    });
});

module.exports = router;
