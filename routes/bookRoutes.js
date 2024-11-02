const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const GlobalBook = require('../models/globalModel');

// Get all books (list all books)
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('books', { books });
});

// Get global books for homepage
router.get('/global', async (req, res) => {
    const books = await GlobalBook.find();
    console.log('Global books:', books); // Add this line
    res.render('index', { books });
});

// Modify the my-books route to handle filtering
router.get('/my-books', async (req, res) => {
    try {
        const category = req.query.category;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        const books = await Book.find(query);
        res.render('myBooks', { 
            books, 
            selectedCategory: category || 'all'  // This line ensures selectedCategory is passed to the template
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});

// in bookRoutes.js
router.post('/my-books/add', async (req, res) => {
    try {
        // Log the incoming request body
        console.log('Received data:', req.body);
        
        const { title, author, cover, description } = req.body;
        
        // Check if book already exists
        const existingBook = await Book.findOne({ title, author });
        if (!existingBook) {
            const newBook = new Book({ 
                title, 
                author,
                image: cover,
                description,
                category: 'Want to Read'
            });
            
            // Log the book before saving
            console.log('Saving book:', newBook);
            
            await newBook.save();
            
            // Log the saved book
            console.log('Saved book:', newBook);
        }
        res.redirect('/api/books/my-books');
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send('Error adding book to My Books');
    }
});

// Update book category (Read / Want to Read)
router.put('/:id/category', async (req, res) => {
    const { category } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { category });
    res.sendStatus(200);
});

// Delete book
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/api/books/my-books');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

// Update book status (Read/Want to Read)
router.put('/:id/status', async (req, res) => {
    try {
        const { category } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { category });
        res.redirect('/api/books/my-books');
    } catch (error) {
        console.error('Error updating book status:', error);
        res.status(500).send('Error updating book status');
    }
});

// Update rating
router.put('/:id/rating', async (req, res) => {
    try {
        const { rating } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { myRating: parseInt(rating) });
        res.redirect('/api/books/my-books');
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).send('Error updating rating');
    }
});

// Update review
router.put('/:id/review', async (req, res) => {
    try {
        const { reviewText } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { myReview: reviewText });
        res.redirect('/api/books/my-books');
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).send('Error updating review');
    }
});


module.exports = router;