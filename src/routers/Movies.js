var express = require('express');
var router = express.Router();
var fs = require('fs');

var Movie = require('../Model/MoviesModel');
var cloud = require('../helpers/cloudinary');
var upload = require('../helpers/multer');

/* Create Movie */
router.post('/upload', upload.videoUpload.any(), function(req, res, next) {
var data = {
    name: req.files[0].originalname,
    title: req.body.title,
    description: req.body.description,
    url: req.files[0].path,
    id: "",
  };

  //First check if movie is in database
  console.log(req.files[0].originalname);
  Movie.find({ name: data.name }, (err, cb) => {
    if (cb.length) {
      res.json({
        error: true,
        message: 'There was a problem uploading the video because movie exists',
      });
    }
  //If no such movie exists, upload movie
    else {   
      console.log("success")

      var file = {
        name: req.files[0].originalname,
        title: req.body.title,
        description: req.body.description,
        url: req.files[0].path,
        id: "",
      };

      cloud
        .uploads(file.url)
        .then((movie) => {
          //Delete movie from filesystem
          fs.unlinkSync(file.url);

          Movie.create({
            name: req.files[0].originalname,
            title: req.body.title,
            description: req.body.description,
            url: movie.url,
            id: movie.id,
          }, (error, movie) => {
            if (error) {
                return res.json({
                    success: false,
                    error: error
                })
            } else {
                return res.json({
                    success: true,
                    message: movie
                })
            }
        })
    })
  }
})
});

/* Edit A Movie Entry*/
router.put('/edit/:id', function(req, res, next) {
    editedData = {
        title: req.body.title,
        description: req.body.description,
        videoFile: req.body.videoFile
    }

    Movie.findByIdAndUpdate({_id: req.params.id}, editedData, (error, movie) => {
      if (error) {
          return res.send({
              success: false,
              message: error
          })
      } else {
          return res.send({
              success: true,
              message: movie
          })
      }
  })
});

/* Get All Movies */
router.get('/', function(req, res, next) {
    Movie.find({}, (error, movie) => {
      if (error) {
          return res.send({
              success: false,
              message: error
          })
      } else {
          return res.send({
              success: true,
              message: movie
          })
      }
  })
  });

  /* Get A Movie */
  router.get('/:id', function(req, res, next) {
    Movie.findById({_id: req.params.id}, (error, movie) => {
      if (error) {
          return res.send({
              success: false,
              message: error
          })
      } else {
          return res.send({
              success: true,
              message: movie
          })
      }
  })
  });

  /* Delete Movie */
  router.delete('/delete/:id', function(req, res, next) {
    Movie.findOneAndDelete({_id: req.params.id}, (error, movie) => {
      if (error) {
        return res.send({
          success: false,
          message: error
        })
      } else {
        return res.send({
          success: true,
          message: movie
        })
      }
    })
  })
  
module.exports = router;
