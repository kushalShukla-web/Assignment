const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

router.post('/', auth, async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const book = new Book({
            title,
            author,
            genre,
            createdBy: req.user.userId,
        });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    const { page = 1, limit = 10, author, genre } = req.query;
    const query = {};
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    try {
        const books = await Book.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Book.countDocuments(query);
        res.json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const reviews = await Review.find({ book: req.params.id })
            .populate('user', 'username')
            .limit(10);

        let averageRating = 0;
        const ratingResult = await Review.aggregate([
            { $match: { book: mongoose.Types.ObjectId(req.params.id) } },
            { $group: { _id: null, avgRating: { $avg: '$rating' } } },
        ]);

        if (ratingResult.length > 0) {
            averageRating = ratingResult[0].avgRating;
        }
console.log("wow")
        res.json({
            book,
            reviews,
            averageRating,
        });
    } catch (err) {
        console.error('Error in GET /books/:id:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const books = await Book.find({
            $or: [
                { title: new RegExp(q, 'i') },
                { author: new RegExp(q, 'i') },
            ],
        }).limit(10);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;