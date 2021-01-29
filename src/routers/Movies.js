const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const auth = require('../middleware/auth')
const Movie = require('../Model/MoviesModel');
//const cloud = require('../helpers/cloudinary');
const upload = multer({ dest: './src/files' })
/* Create Movie */
router.post('/upload', auth,  upload.any(), async function(req, res, next) {
 
          var data = {
            //coverpics_url: req.files[0].path,
            //movie_url:req.files[1].path,
            title: req.body.title,
            description: req.body.description,
            release_date: req.body.release_date,
            timestamps: Date.now(),
            owner: req.user._id
          }

          console.log(data)

        //   try {
        //   cloud.uploads(data.coverpics_url).then(img_metadata=>{
        //     data.coverpics_url=img_metadata.secure_url
        //     cloud.uploads(data.movie_url).then(vid_metadata=>{
        //       data.movie_url=vid_metadata.secure_url
        //       console.log(data)

        //       // const newMovie = new Movie({
        //       //   ...data,
        //       //   owner: req.user._id
        //       // })
        //       Movie.create(data, (error, movie) => {
        //         if (error) {
        //             return res.json({
        //                 success: false,
        //                 error: error
        //             })
        //         } else {
        //             return res.json({
        //                 success: true,
        //                 message: movie
        //             })
        //         }
        //     })
        //       })
        //     })
        // } catch(error){
        //   return res.json({
        //     success: false,
        //     message: error
        //   })
        // }
        
 });

/* Edit A Movie Entry*/
router.post('/edit/:id', auth,  function(req, res, next) {
    data = {
      title: req.body.title,
      description: req.body.description,
      release_date: req.body.release_date,
      timestamps: Date.now()
    }

    Movie.findByIdAndUpdate({_id: req.params.id, owner: req.user._id}, data, (error, movie) => {
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

// users getting the saaves by them
router.get('/', auth,  async function(req, res, next) {
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
router.get('/movies-all', async (req, res) => {
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
        message: 'movie was found successfully',
        success: false
      })
    }

    res.status(200).json({
      movie,
      success: true
    })
  }catch(e){
    res.status(400).json({
      message: 'unable to link user with movie search',
      success: false
    })
  }
  
}, (error, req, res, next)=> {
  res.status.json({
    message: error.message
  })
});

  /* Delete Movie */
  router.delete('/delete/:id', auth, (req, res, next) => {
    Movie.findOneAndDelete({_id: req.params.id, owner: req.user._id}, (error, movie) => {
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

  /* Search movie */
  router.get('/search', (req, res) => {
    var data = req.query
 
    console.log(data)

    Movie.find(data)
    
      .then(result => {
          console.log(result);
          res.status(200).send({
            success: true,
              result
          })
      })
      .catch(err => {
          res.status(500).send({
              success: false,
              error: err
       });
    });
  });
  
module.exports = router;
