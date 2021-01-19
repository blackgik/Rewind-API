const express = require('express');
const User = require('../Model/UserModel');
const auth = require('../middlware/auth')
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
});

// login user
router.post('/users/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken();

        res.status(202).send({ user, token })

    }catch(e) {
        res.status(404).send({
            error: 'invalid users'
        })
    }
})

// User logout
router.post('/users/me/logout', auth, async(req, res)=> {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.user.save()
        res.send({
            message: 'logout successfully'
        })

    }catch(e) {
        res.status(500).send(e)
    }
})

// logout user from every device
router.post('/users/me/logoutall', auth, async(req, res)=> {
    try{
        req.user.tokens =req.user.tokens.filter((token)=> delete token)
        req.user.save()
        
        res.send({
            message: 'logged out from all devices'
        })
    }catch(e) {
        res.send(e)
    }
})


// exporting the routes
module.exports = router