const express = require ('express')
<<<<<<< HEAD
require('./db/mongoose')
const routes = require('./routes')
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
=======
const cors = require('cors');
const passport = require('passport')
var cookieSession = require('cookie-session')
/** calling the local modules */
require('./db/mongoose')
const UserRouter = require('./routers/Users')
const ThirdPartyRouter = require('./routers/thirdParty')
>>>>>>> develop

const app = express()

// creating the server port
const port = process.env.PORT

// serving up the json file and the routes
app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);
=======
app.use(cors())
app.use(cookieSession({
    name: 'rewind-session',
    keys: ['key1', 'key2']
  }))
app.use(passport.initialize());
app.use(passport.session());

app.use(UserRouter);
app.use(ThirdPartyRouter);

>>>>>>> develop


// serving up the server on the port
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})
