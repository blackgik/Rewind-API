const app = require('./app')

// creating the server port
const port = process.env.PORT

// serving up the server on the port
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})