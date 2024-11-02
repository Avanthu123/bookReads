// in models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, enum: ['Read', 'Want to Read'], default: 'Want to Read' },
    dateAdded: { type: Date, default: Date.now },
    avgRating: { type: Number, default: 0 },
    image: { type: String }, // URL for book cover
    description: { type: String },
    myRating: { type: Number },
    myReview: { type: String }
});

module.exports = mongoose.model('Book', bookSchema);