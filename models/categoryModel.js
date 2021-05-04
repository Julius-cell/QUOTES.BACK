const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
    quotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote'
    }]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;