var express = require('express');
var router = express.Router();
var Movie = require('../Model/MoviesModel');

/* Create Movie */
router.post('/upload', function(req, res, next) {
  var data =  {
    title: req.body.title,
    description: req.body.description,
    videoFile: req.body.videoFile
  }

  Movie.create(data, (error, movie) => {
    if (error) {
        return res.send({
            success: false,
            error: error
        })
    } else {
        return res.send({
            success: true,
            message: movie
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
