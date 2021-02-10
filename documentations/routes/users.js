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
 * @api {post} users/sign-up Create
 * @apiDescription Creates a new user
 * @apiName Create User
 * @apiGroup Users
 *
 * 
 * @apiParamExample {json} Request-Example: all fields are required
 *{
   email: req.body.email,
   password: req.body.password,
   confirmPassword: req.body.confirmPassword
  }
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */

   /**
 * @api {post} users/admin-sign-up Create Admin
 * @apiDescription Creates a new admin
 * @apiName Create Admin
 * @apiGroup Users
 *
 * 
 * @apiParamExample {json} Request-Example: all fields are required
 *{
   email: req.body.email,
   password: req.body.password,
   confirmPassword: req.body.confirmPassword
  }
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */

   /**
 * @api {get} users/verify-email?token=emailToken Verify Email
 * @apiDescription Verfies email
 * @apiName verifies a user email
 * @apiGroup Users
 *
 * 
 * @apiParam {String} emailToken is an auto-generated token
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */
 /**
 * @api {post} users/login Login User
 * @apiDescription Logs in a user
 * @apiName Login User
 * @apiGroup Users
 *
 * 
 * @apiParamExample {json} Request-Example: all fields are required
 *{
   email: req.body.email,
   password: req.body.password
  }
 * @apiParam {String} token is auto-generated
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */
 /**
 * @api {post} users/login-admin Login Admin
 * @apiDescription Logs in an admin
 * @apiName Login Admin
 * @apiGroup Users
 *
 * 
 * @apiParamExample {json} Request-Example: all fields are required
 *{
   email: req.body.email,
   password: req.body.password
  }
 * @apiParam {String} emailToken is auto-generated
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */
 /**
 * @api {get} users/me View Profile
 * @apiDescription View Profile
 * @apiName View Profile
 * @apiGroup Users
 *
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */
/**
 * @api {get} users/get-all-users User count
 * @apiDescription Counts all the users
 * @apiName User Count
 * @apiGroup Users
 *
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */
