const express = require ('express')
const cors = require('cors');
require('./db/mongoose')
const UserRouter = require('./routers/Users')

const app = express()

// creating the server port
const port = process.env.PORT

// serving up the json file and the routes
app.use(express.json());
app.use(cors())
app.use(UserRouter);


// serving up the server on the port
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})
