const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
mongoose.connect('mongodb://localhost:27017/books', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// Redirect root to global books page
app.get('/', (req, res) => res.redirect('/api/books/global'));

app.listen(3000, () => console.log('Server started on port 3000'));