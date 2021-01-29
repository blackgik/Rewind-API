const express = require ('express')
const cors = require('cors');
const passport = require('passport')
const cookieSession = require('cookie-session')
const UserRoute = require('./routes/index')
/** calling the local modules */
require('./db/mongoose')
const app = express()

// creating the server port
const port = process.env.PORT

// serving up the json file and the routes
app.use(express.json());
app.use(cors())
app.use(cookieSession({
    name: 'rewind-session',
    keys: ['key1', 'key2']
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use(UserRoute)

// serving up the server on the port
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})