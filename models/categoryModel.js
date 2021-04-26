const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote"
    }]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;