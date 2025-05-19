const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Reviews = require('../models/Review');

router.post('/:id', auth, async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const review = new Reviews({
            book: req.params.id,
            user: req.user.userId,
            rating,
            comment,
        });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const review = await Reviews.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Reviews not found' });
        }
        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const review = await Reviews.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Reviews not found' });
        }
        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.remove();
        res.json({ message: 'Reviews deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;