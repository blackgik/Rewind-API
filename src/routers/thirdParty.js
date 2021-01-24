const express = require('express');
const passport = require('passport')
const router = new express.Router();
require('../services/googleValidation')
require('../services/facbookValidation')


/**  
GOOGLE VALIDATION
 */

// validating the user is logged in
const isLoggedIn = (req, res, next)=>{
    if(req.user){
        next()
    }else{
        res.status(400).json({
            err:'user does not exist'
        })
    }
}

// routing to the home page
router.get('/', (req, res)=>{
    res.status(200).json({
        message:'you not logged in yet'
    })
});

// routing for when the user is authenticated
router.get('/good', isLoggedIn, (req,res)=> {
    res.status(200).json({
        message:'you are logged in'
    })
})

// route for when the user is not authenticated
router.get('/users/login', (req, res)=> {
    res.status(200).json({
        message: 'please login'
    })
} )

// confirming the user exist on the google platform
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

// validating and redirecting the user to the prefered login page
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
    res.redirect('/good');
  });


/** 
 * FACEBOOK VALIDATION
 **/ 
// confirming that the user exist on the facebok platform
router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}))

// validating or authenticating the user
router.get('/facebook/callback', 
passport.authenticate('facebook', { successRedirect: '/good',failureRedirect: '/users/login' }));

module.exports = router