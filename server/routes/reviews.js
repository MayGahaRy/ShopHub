const express = require('express');
const router = express.Router();
const { Review, User, Product } = require('../models');
const auth = require('../middleware/auth');

// @route   POST api/reviews
// @desc    Add a review
// @access  Private
router.post('/', auth, async (req, res) => {
    const { productId, rating, comment } = req.body;

    try {
        const user = await User.findByPk(req.user.id);

        const review = await Review.create({
            userId: req.user.id,
            productId,
            rating,
            comment,
            user_name: user.name
        });

        // Update product rating logic could go here (recalculating average)
        // For simplicity, we might just fetch average on get

        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/reviews/:productId
// @desc    Get reviews for a product
// @access  Public
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { productId: req.params.productId },
            order: [['createdAt', 'DESC']]
        });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
