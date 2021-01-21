const express = require('express');
const crypto = require('crypto')
const User = require('../Model/UserModel');
const auth = require('../middlware/auth')
const { verificationEmail, sendWelcomeEmail } = require('../services/emailVerify')
const router = new express.Router()


// creating the user sign up route
router.post('/users/sign-up', async (req, res)=>{
    const newUser = new User({
        ...req.body,
        emailToken: crypto.randomBytes(64).toString('hex'),
        isVerified: false
    });

    try{
        await newUser.save()
        verificationEmail(newUser.email, newUser.emailToken, newUser.username)
        const token = newUser.generateAuthToken()

        res.status(201).send({ newUser, token })
    }catch (e){
        res.status(400).send(e)
    }
});

// user verification route
router.get('/users/verify-email', async (req, res, next)=>{
    try {
        const verifiedToken = req.query.token
    
        console.log(verifiedToken,'.......................................')
    
        const user = await User.findOne({emailToken: verifiedToken});
        if(!user) {
            res.status(200).json({
            message: 'token does not exist'
            })
        }
        else{
            user.emailToken = null
            user.isVerified = true

            await user.save()
            sendWelcomeEmail(user.email, user.username)
            res.status(200).json({"message": "Email confirmed"})
            console.log('welcome email has been sent')
        }

        
    }catch(e) {
        res.status(400).json({"message":'user with token does not exist', "error": e})
    }

})

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