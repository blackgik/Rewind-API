const express = require ('express')
const cors = require('cors');
const passport = require('passport')
const cookieSession = require('cookie-session')
require('express-async-errors');
/** calling the local modules */
require('./db/mongoose')
const {routes} = require('./routes')

const app = express()
routes(app)

/* Allow CORS */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// serving up the json file and the routes
app.use(express.json());
app.use(cors())
app.use(cookieSession({
    name: 'rewind-session',
    keys: ['key1', 'key2']
  }))
app.use(passport.initialize());
app.use(passport.session());

// creating the server port
const port = process.env.PORT

// serving up the server on the port
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})