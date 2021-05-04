const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'A quote must have a message'],
    unique: true,
    trim: true,
  },
  person: {
    type: String,
    required: [true, 'A quote must have an Author'],
    trim: true,
    maxlength: [20, 'An Author name must have less or equal then 20 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;