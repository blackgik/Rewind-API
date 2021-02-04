var express = require('express');
var router = express.Router();

var Category = require('../Model/CategoryModel');


/* Create category */
router.post('/new', async(req, res, next) => {
    var data = {
        title: req.body.title
    }

    try {
    var category = await Category.create(data);

        return res.send({
            success: true,
            message: category
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error
        })
    }
})

/* Edit a category */
router.post('/edit/:id', async(req, res, next) => {
    const options = { new: true, runValidators: true}
    var data = {
        title: req.body.title
    }

    try {
    var category = await Category.findByIdAndUpdate({_id: req.params.id}, data, options) 

        return res.send({
            success: true,
            message: category
        })
    } catch (error){
        return res.send({
            success: false,
            message: error
        })
    }
})

/* Delete a Category */
router.delete('/delete/:id', async(req, res, next) => {
    try {
    var category = await Category.findByIdAndDelete({_id: req.params.id})
        return res.send({
            success: true,
            message: category
        })
    } catch (error){
        return res.send({
            success: false,
            message: error
        })
    }
})


module.exports = router;