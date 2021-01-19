const mongoose = require('mongoose');

// connecting to the database
mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex:true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})