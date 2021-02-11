/**
 * @apiDefine Success
 *
 * @apiSuccess {boolean} success The success of the responce usually is true
 * @apiSuccess {object} message This contains the resource (an object or
 * array of objects) and/or other required particulars
 *
 * 
 *   @apiSuccessExample {json} Success-Response
 * HTTP/1.1 200/201 OK
 * {
 *    "success": true,
 *    "message": {...} or [{}, {}, ...],
 *  
 * }
 */

 /**
  * @apiDefine Error
  *
  * @apiError {boolean} success The success of this responce is usually false
  * @apiError {string} message This is the info about the request
  *
  * @apiErrorExample {json} Error-Response:
  * HTTP/1.1 xxx
  * {
  *   "success": false,
  *   "message": "info about the error if any"
  * }
  */

  /**
 * @apiDefine Header Header
 * @apiHeader {String} token Token value.
 *
 */

  /**
 * @api {post} movies/upload Create
 * @apiDescription Creates a new movie
 * @apiName Create Movie
 * @apiGroup Movies
 *
 * 
 * @apiParamExample {json} Request-Example: all fields are required
 *{
    coverpics_url: req.files[0].path,
    movie_url: req.files[1].path,
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    cast: req.body.cast,
    category: req.body.category
  }
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */

 /**
 * @api {put} movies/edit/movieId Update
 * @apiDescription Update a movie 
 * @apiName Update Movie
 * @apiGroup Movies
 *
 * @apiParam {String} movieId the movie's id
 * 
 * @apiParamExample {json} Request-Example: allfields are required
 *{
    coverpics_url: req.files[0].path,
    movie_url: req.files[1].path,
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    cast: req.body.cast,
    category: req.body.category
  }
 *
 * @apiUse Header
 *
 * @apiUse Success
 *
 * @apiUse Error
 */

 /**
 * @api {get} movies?page=number&limit=number Movies List
 * @apiDescription Retrieves movies in the database with a limit of 12 per page
 * @apiName List Movies
 * @apiGroup Movies
 * 
 *  @apiParam {Number} page & limit - this request gets 12 movies in the database, an increment by 1 of the page number will give the next 12. The default page value is 1. Limit sets the number of items per requests, the default value is 12.
 * 
 * @apiUse Success
 *
 * @apiUse Error
 *
 */

  /**
 * @api {get} movies/:category/movies?page=number&limit=number Movies List by Category
 * @apiDescription Retrieves 12 movies in a category
 * @apiName List Movies
 * @apiGroup Movies
 * 
 * @apiParam {String} :category is the category title
 * 
 * @apiParam {Number} page & limit - this request gets 12 movies in the database, an increment by 1 of the page number will give the next 12 movies. The default page value is 1.  Limit sets the number of items per requests, the default value is 12.
 * 
 * @apiUse Success
 *
 * @apiUse Error
 *
 */

 /**
 * @api {get} movies/movieId/movie Single Movie
 * @apiDescription Retrieves data for a single movie
 * @apiName Single Movie
 * @apiGroup Movies
 * 
 * @apiParam {String} movieId is the movie's id
 * 
 * @apiUse Success
 *
 * @apiUse Error
 *
 */

 /**
 * @api {delete} movies/delete/movieId Delete
 * @apiDescription Deletes a Movie
 * @apiName Delete Movie
 * @apiGroup Movies
 *
 * @apiParam {String} movieId the movie's id
 *
 * @apiUSe Success
 *
 * @apiUse Error
 */

 /**
 * @api {get} movies/search?q=title Search
 * @apiDescription Search for a movie
 * @apiName Search Movie
 * @apiGroup Movies
 *
 * @apiParam {String} title is the movie title
 *
 * @apiUSe Success
 *
 * @apiUse Error
 */

 /**
 * @api {get} movies/movie-count Count
 * @apiDescription Get total number of movies
 * @apiName CountMovies
 * @apiGroup Movies
 *
 * @apiUSe Success
 *
 * @apiUse Error
 */

/**
 * @api {get} movies/recently-added Recently Added
 * @apiDescription Get the most recent 6 movies
 * @apiName RecentlyAdded
 * @apiGroup Movies
 *
 * @apiUSe Success
 *
 * @apiUse Error
 */

 /**
 * @api {get} movies/featured-movies Featured Movies
 * @apiDescription Get 4 featured movies
 * @apiName Featured Movies
 * @apiGroup Movies
 *
 * @apiUSe Success
 *
 * @apiUse Error
 */