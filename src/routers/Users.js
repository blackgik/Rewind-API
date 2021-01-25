const express = require('express');
const crypto = require('crypto')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const User = require('../Model/UserModel');
const auth = require('../middleware/auth')
const { verificationEmail, sendWelcomeEmail, sendEmailCancelation } = require('../services/emailVerify')
const { sendPasswordEmailChange } = require('../services/passwordchange')
const router = new express.Router()


// creating the user sign up route
router.post('/sign-up', async (req, res)=>{
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
router.get('/verify-email', async (req, res, next)=>{
    try {
        const verifiedToken = req.query.token
    
        console.log(verifiedToken,'.......................................')
    
        const user = await User.findOne({emailToken: verifiedToken});
        if(!user) {
            res.status(404).json({
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

// forgot password route
router.post('/forgotPassword', async (req, res)=>{
    try{
        const { email } = req.body;
        const user = await User.findOne({ email })
        
        if(!user) {
            res.status(401).json({message:"user does not exist"})
        }

        token = jwt.sign({id:user._id.toString()}, process.env.RESET_LINK_TOKEN, {expiresIn: "20m"})

        sendPasswordEmailChange(user.email, user.username, token)

        user.passwordToken = token
        await user.save()
        res.status(200).json({message: 'token has been updated'})
    }catch(e){
        res.status(400).json({
            err: 'reset link failed'
        })
    }
})

// reseting password
router.post('/reset-password', async (req, res)=> {
    try{
        const { passToken, newPass, confirmPass} = req.body
        if(passToken) {
            jwt.verify(passToken, process.env.RESET_LINK_TOKEN, async (err, data)=> {
                if(err) {
                    res.status(401).json({error:"incorrect token or has expired"})
                }
                const user = await User.findOne({passwordToken: passToken})
                if (user){
                    user.password = newPass
                    user.confirmPassword = confirmPass
                    await user.save
                    res.status(200).json({message:'password has been reset'})
                }else{
                    res.status(404).json({err:'user does not exist'})
                }
            })
        }
    }catch(e){

    }
    // const {passwordToken, newPass} = req.body;
    // if(passwordToken) {
    //     jwt.verify(passwordToken, process.env.RESET_LINK_TOKEN, function(err, decodedDdata){
    //         if(err){
    //             res.status(401).json({
    //                 error: 'incorrect token or is expired'
    //             })
    //         }

    //         User.findOne({passwordToken}, function(err, user){
    //             if(err || !user){
    //                 res.status(404).json({
    //                     error:'User does not exist'
    //                 })
    //             }else{
    //                 const obj = {
    //                     password: newPass,
    //                     passwordToken: ''
    //                 }

    //                 user = _.extend(user, obj)
    //                 user.save((err, data)=>{
    //                     if(err){
    //                         res.status(401).json({message:'reset link password error'})
    //                     }else{
    //                         res.status(200).json({message:"password has been reset successfully"})
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // }else{
    //     res.status(401).json({error: "authentication Error!!!"})
    // }
})

// login user
router.post('/login', async(req, res) => {
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
router.post('/me/logout', auth, async(req, res)=> {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.user.save()
        sendEmailCancelation(req.user.email, req.user.username)
        res.send({
            message: 'logout successfully'
        })

    }catch(e) {
        res.status(500).send(e)
    }
})

// logout user from every device
router.post('/me/logoutall', auth, async(req, res)=> {
    try{
        req.user.tokens =req.user.tokens.filter((token)=> delete token)
        req.user.save()
        sendEmailCancelation(req.user.email, req.user.username)
        res.status(200).json({
            message: 'logged out from all devices'
        })
    }catch(e) {
        res.send(e)
    }
})

// 

// updating user password or profile
router.patch('/me/update', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowableupdate = ['username', 'email', 'password']
    const isValidUpdate = updates.every((update)=> allowableupdate.includes(update));

    if(!isValidUpdate) {
        return res.status(400).json({"error": 'invalid parameter to update'})
    }

    try{
        updates.forEach((update)=> req.user[update] = req.body[update] )

        await req.user.save()

        res.status(200).send(req.user)
    }catch(e) {
        res.status(400).json({
            "message": e
        })
    }
})

// exporting the routes
module.exports = router