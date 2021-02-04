var mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unque: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Category', CategorySchema)