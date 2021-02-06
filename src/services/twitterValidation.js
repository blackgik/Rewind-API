const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(user, done) {
      done(null, user);
  });

passport.use(new TwitterStrategy({
    consumerKey: 'ESXg2phTKmZEe4QQskyjmF9Zq',
    consumerSecret: 'uEL4IEv5HGbG8TCECX8LXf9HnCh67ou5UYRt74YmpBNxHi7tj7',
    callbackURL: "http://localhost:5000/auth/twitter/callback",
    includeEmail: true
  },
  function(token, tokenSecret, profile, done) {
      console.log(profile)
      done(null, user);

  }
));