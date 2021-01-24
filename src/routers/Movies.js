var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var Movie = require('../Model/MoviesModel');
var cloud = require('../helpers/cloudinary');
var upload = multer({ dest: './src/files' })
/* Create Movie */
router.post('/upload', upload.any(), function(req, res, next) {
 
          var data = {
            coverpics_url: req.files[0].path,
            movie_url:req.files[1].path,
            title: req.body.title,
            description: req.body.description,
            release_date: req.body.release_date,
            timestamps: Date.now()
          }

          try {
          cloud.uploads(data.coverpics_url).then(img_metadata=>{
            data.coverpics_url=img_metadata.secure_url
            cloud.uploads(data.movie_url).then(vid_metadata=>{
              data.movie_url=vid_metadata.secure_url
              console.log(data)
              Movie.create(data, (error, movie) => {
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
            })
        } catch(error){
          return res.json({
            success: false,
            message: error
          })
        }
        
 });

/* Edit A Movie Entry*/
router.put('/edit/:id', function(req, res, next) {
    data = {
      coverpics_url: req.files[0].path,
      movie_url:req.files[1].path,
      title: req.body.title,
      description: req.body.description,
      release_date: req.body.release_date,
      timestamps: Date.now()
    }

    Movie.findByIdAndUpdate({_id: req.params.id}, data, (error, movie) => {
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
