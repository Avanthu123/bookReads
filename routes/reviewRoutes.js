const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

// Add a review
router.post('/:bookId', async (req, res) => {
    const { reviewText, rating } = req.body;
    const review = new Review({ bookId: req.params.bookId, reviewText, rating });
    await review.save();

    // Update book's average rating
    const reviews = await Review.find({ bookId: req.params.bookId });
    const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    await Book.findByIdAndUpdate(req.params.bookId, { avgRating });

    res.redirect('/api/books/my-books');
});

module.exports = router;