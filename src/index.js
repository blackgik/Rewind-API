const express = require ('express')
require('./db/mongoose')
const routes = require('./routes')

const app = express()

// creating the server port
const port = process.env.PORT

// serving up the json file and the routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);


// serving up the server on the port
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})
