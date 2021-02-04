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
router.post("/upload", upload.any(), async(req, res, next) => {
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

  try {
  await cloud.uploads(data.coverpics_url).then((img_metadata) => {
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
  return res.json({
    success: false,
    message: "You are not authorized to access this route"
  })
});

/* Get All Movies */

// users getting the movies saved by them
router.get('/auth/all-movies', auth,  async function(req, res, next) {
  const match = {}

  if(req.query.movie_search) {
    match.movie_search = req.query.movie_search
  }

  try{
    await req.user.populate({
      path: 'movies',
      match
    }).execPopulate()
    res.status(200).json({
      movies: req.user.movies,
      success: true
    })
  }catch(err) {
    res.status(400).json({
      message: 'can not fetch movies created by user',
      success: false
    })
  }

})

// user getting all movies
router.get('/', async (req, res) => {
  try {
    const movies = await User.find({})
    res.status(200).json({
      messages: 'fetching all movies',
      movies,
      success: true
    })
  }catch {
    res.status(400).json({
      message: 'unable to fetch all movies',
      success: false
    })
  }
}, (err, req, res, next)=> {
  res.status(400).json({
    message: err.message
})
})
  
  /* Get A Movie */
router.get('/:id', async function(req, res) {
  const _id = req.params._id

  try{
    const movie = await Movie.findOne({id})

    if(!movie) {
      res.status(404).json({
        message: 'movie was not found',
        success: false
      })
    }
  }catch(e) {
    res.status(400).json({
      message:'can not process the id',
      success: false
    })
  };
});

/* Get A Movie */
router.get("/:id", async(req, res, next) => {
  await Movie.find({ _id: req.params.id }, (error, movie) => {
  if(!movie){
    return res.send({
      success: false,
      message: "Movie not found"
    })
  } else {
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
  }
  });
});

/* Delete Movie */
router.delete("/delete/:id", async(req, res, next) => {
 await Movie.findOneAndDelete({ _id: req.params.id }, (error, movie) => {
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
// router.get("/search/movie", async(req, res, next) => {
//   var data = req.query;

//   console.log(data);

//   await Movie.find(data, (error, movie) => {
//   if(!movie){
//     return res.send({
//       success: false,
//       message: "movie not found"
//     })
//   } else {
//     if(error){
//       return res.send({
//         success: false,
//         message: error
//       })
//     } else {
//       return res.send({
//         success: true,
//         message: 
//       })
//     }
//   }
// })
//     // .then((result) => {
//     //   console.log(result);
//     //   res.status(200).send({
//     //     success: true,
//     //     result,
//     //   });
//     // })
//     // .catch((err) => {
//     //   res.status(500).send({
//     //     success: false,
//     //     error: err,
//     //   });
//     // });
// });

module.exports = router;
