const express = require('express');
const User = require('../Model/UserModel');
const router = new express.Router()


// creating the user sign up route
router.post('/users/sign-up', async (req, res)=>{
    const newUser = new User(req.body);

    try{
        await newUser.save()
        const token = newUser.generateAuthToken()

        res.status(201).send({ newUser, token })
    }catch (e){
        res.status(400).send(e)
    }
})


// exporting the routes
module.exports = router