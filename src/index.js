const express = require ('express')
const cors = require('cors');
const passport = require('passport')
const cookieSession = require('cookie-session')
require('express-async-errors');
/** calling the local modules */
require('./db/mongoose')

const { routes } = require('./routes')

const app = express()
app.use(cors());
// serving up the json file and the routes
app.use(express.json());
app.use(cookieSession({
    name: 'rewind-session',
    keys: ['key1', 'key2']
  }))
app.use(passport.initialize());
app.use(passport.session());
routes(app);

// creating the server port
const port = process.env.PORT

// serving up the server on the port
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})