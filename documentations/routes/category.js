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
 * @api {post} category/new Create
 * @apiDescription Creates a new category
 * @apiName Create Category
 * @apiGroup Category
 *
 * @apiParamExample {json} Request-Example: the title field is required
 *{
    "title": "category title"
  }
 *
 *@apiUse Header
 *
 *@apiUse Success
 *
 * @apiUse Error
 */

 /**
 * @api {put} category/edit/categoryId Update
 * @apiDescription Update a category title
 * @apiName Update Category
 * @apiGroup Category
 *
 * @apiParam {String} categoryId the category's id
 *
 * @apiUse Header
 *
 * @apiParamExample {json} Request-Example: the title field is required
 *  {
    "title": "category title"
    }
 *
 * @apiUse Success
 *
 * @apiUse Error
 */

 /**
 * @api {get} category/all Category List
 * @apiDescription Retrieves all the categories
 * @apiName List Categories
 * @apiGroup Category
 * @apiUse Success
 *
 * @apiUse Error
 *
 */

 /**
 * @api {delete} category/delete/categoryId Delete
 * @apiDescription Deletes a Category
 * @apiName Delete Category
 * @apiGroup Category
 *
 * @apiParam {String} categoryId the category's id
 *
 * @apiUSe Success
 *
 * @apiUse Error
 */