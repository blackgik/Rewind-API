const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const _ = require("lodash");
const moment = require("moment");
require('express-async-errors');

const auth = require('../middleware/auth')
const Movie = require("../Model/MoviesModel");
const User = require('../Model/UserModel');
const Category = require('../Model/CategoryModel');
const cloud = require("../helpers/cloudinary");
const upload = multer({ dest: "./src/files" });


/* Create Movie */
router.post("/upload", upload.any(), (req, res, next) => {
  var data = {
    coverpics_url: req.files[0].path,
    movie_url: req.files[1].path,
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    cast: req.body.cast,
    category: req.body.category,
    length: "",
    timestamps: Date.now()
  };
 
  try {
   cloud.uploads(data.coverpics_url).then((img_metadata) => {
      data.coverpics_url = img_metadata.secure_url;
      cloud.uploads(data.movie_url).then((vid_metadata) => {
        data.movie_url = vid_metadata.secure_url;
        var sec_length = vid_metadata.duration
        data.length = moment.unix(sec_length).utc().format('H [hrs] m [min]');
        console.log(data.length);

        var movie = Movie.create(data)
            return res.status(201).json({
              success: true,
              message: data,
            });
        });
      });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});
 
/* Edit A Movie Entry*/
router.put("/edit/:id",  async(req, res, next) => {
  const options = { new: true, runValidators: true}
  var data = {
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    cast: req.body.cast,
    category: req.body.category,
    timestamps: Date.now(),
  };

  try {
  var movie = await Movie.findById({ _id: req.params.id }, data, options) 
      return res.send({
        success: true,
        message: movie,
      });
    } catch (error){
      return res.send({
        success: false,
        message: error
      })
    }
});

/* Get All Movies */
router.get("/", async(req, res, next) => {
  const { page = 1, limit = 12 } = req.query;

  try {
  var movies = await Movie.find({}).limit(limit * 1).skip((page - 1) * limit).exec();
      return res.send({
        success: true,
        message: movies,
      });
    } catch (error){
      return res.send({
        success: false,
        message: error
      })
    }
});

/* Get movies by category */
router.get('/:category/movies', async(req, res, next) => {
  const { page = 1, limit = 12 } = req.query;
 
  try {
  var movies = await Movie.find({category: req.params.category}).limit(limit * 1).skip((page - 1) * limit).exec();
  if(_.isEmpty(movies)){
    return res.send({
      success: false,
      message: "No movies in this category"
    })
  }
    return res.send({
      success: true,
      message: movies
    })
  } catch(error){
    return res.send({
      success: false,
      message: error
    })
  }
})

/* Get A Movie */
router.get("/:id/movie", async(req, res, next) => {
  try {
  var movie = await Movie.find({ _id: req.params.id })
  if(!movie){
    return res.send({
      success: false,
      message: "Movie not found"
    })
  } else {
      return res.send({
        success: true,
        message: movie,
      });
  }
} catch (error){
  return res.send({
    success: false,
    message: error
  })
}
});

/* Delete Movie */
router.delete("/delete/:id", async(req, res, next) => {
  try {
 var movie = await Movie.findOneAndDelete({ _id: req.params.id })
      return res.send({
        success: true,
        message: movie,
      });
    } catch (error){
      return res.send({
        success: false,
        message: error
      })
    }
});

/* Search Movie */
router.get("/search", async(req, res, next) => {
  var data = new RegExp(req.query.q, 'gi');
  try {  
  var movies = await Movie.find({$text: {$search: data}});  
  //check if movie is not found 
    if(_.isEmpty(movies)){
      return res.send({
        success: false,
        message: "Movie not found"
      })
    }
       return res.send({
         success: true,
         message: movies
       }) 
      
    } catch (error){
    return res.send({
      success: false,
      message: error
    })
  }
})

/*Get movies count*/
router.get('/movie-count', async(req, res, next) => {

  try {
    var movies = await Movie.find({})
    count = movies.length;

    return res.send({
      success: true,
      message: count
    })
    
  } catch (error){
    return res.send({
      success: false,
      message: error
    })
  }
})

/* Get recently added movie */
router.get('/recently-added', async(req, res, next) => {
  
try {
var recentlyAddedMovies = await Movie.find({}).sort({'updatedAt': -1}).limit(6);
  
    return res.send({
    success: true,
    message: recentlyAddedMovies
  })

} catch(error){
  return res.send({
    success: false,
    message: error
  })
}
});

/* Get Featured Movies */
router.get('/featured-movies', async(req, res, next) => {
  try {
  var featuredMovies = Movie.findRandom({},{},{limit: 4}, function(err, featuredMovies) {
      if (!err) {
        return res.send({
          success: true,
          message: featuredMovies
        })
      }
    });
  } catch (error){
    return res.send({
      success: false,
      message: error
    })
  }
})

module.exports = router;
