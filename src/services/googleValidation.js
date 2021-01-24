var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../Model/UserModel')

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(user, done) {
      done(null, user);
  });

passport.use(new GoogleStrategy({
    clientID: '31279175220-n1vao9s6hfporm3qjgj966svigq85m24.apps.googleusercontent.com',
    clientSecret: '62BSPwid8KTUe-YKC6dVEzsv',
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      if(profile){
          console.log(profile)
        return done(null, profile);
      }else{
          return({
              message:'user is not defined'
          })
      }
        
  }
));