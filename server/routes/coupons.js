const express = require('express');
const router = express.Router();
const { Coupon } = require('../models');
const auth = require('../middleware/auth');

// @route   POST api/coupons/validate
// @desc    Validate a coupon code
// @access  Public
router.post('/validate', async (req, res) => {
    const { code } = req.body;

    try {
        const coupon = await Coupon.findOne({ where: { code, isActive: true } });
        if (!coupon) {
            return res.status(404).json({ msg: 'Invalid Coupon Code' });
        }
        res.json(coupon);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/coupons
// @desc    Get all coupons
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        const coupons = await Coupon.findAll();
        res.json(coupons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/coupons
// @desc    Create a coupon
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    const { code, discount, type } = req.body;

    try {
        const coupon = await Coupon.create({
            code,
            discount,
            type
        });
        res.json(coupon);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/coupons/:id
// @desc    Delete a coupon
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        await Coupon.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'Coupon removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
