const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

// connecting to the database
mongoose.connect('mongodb+srv://admin:technology@cluster0.o8heh.mongodb.net/test', {
    useCreateIndex:true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})