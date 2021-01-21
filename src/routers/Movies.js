var express = require('express');
var router = express.Router();
var Movie = require('../Model/MoviesModel');
var cloud = require('../helpers/cloudinary');
var upload = require('../helpers/multer');
var fs = require('fs');

/* Create Movie */
router.post('/upload', upload.videoUpload.array('name'), function(req, res, next) {
var data = {
    name: req.files[0].originalname,
    description: req.body.description,
    path: req.files[0].path,
    id: "",
  };

  //First check if movie is in database
  console.log(req.files.originalname);
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

      var document = {
        name: req.files.originalname,
        description: req.body.description,
        path: req.files.path,
        id: "",
      };

      var path = document.path

      var uploader = async(path) =>  await cloud
        .uploads(path, 'files')
       
          var urls = []
          var files = req.files

          for(var file of files) {
            var { path } = file
            var newUrl = uploader(path)
            urls.push(newUrl)
            fs.unlinkSync(path)
          }

          Movie.create(document, (error, movie) => {
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
