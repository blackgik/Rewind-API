const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(user, done) {
      done(null, user);
  });

passport.use(new FacebookStrategy({
    clientID: '404915590794029',
    clientSecret: '02ab9394c4744c186b4577a2f969aa7c',
    callbackURL: "http://localhost:5000/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile)
      done(null, profile);
    
  }
));