var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

const movieSchema = new mongoose.Schema({
    coverpics_url: {
        type: String,
        required: false
    },
    movie_url: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    cast: {
       type: String,
       required: true 
    }
    ,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    category: {
        type: String,
        required: false
    }
},
{
    timestamps: true
}
)
movieSchema.plugin(random);

movieSchema.index({ title: 'text'});

module.exports = mongoose.model('Movie', movieSchema);
