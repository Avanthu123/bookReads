const mongoose = require('mongoose');

const globalBookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String }
});

module.exports = mongoose.model('GlobalBook', globalBookSchema);
