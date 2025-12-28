const express = require('express');
const router = express.Router();
const { Order, User } = require('../models');
const auth = require('../middleware/auth');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { items, total } = req.body;

        const newOrder = await Order.create({
            items, // Passed as JSON array
            total,
            userId: req.user.id,
            status: 'Processing'
        });

        res.json(newOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/orders
// @desc    Get all orders (Admin) or User specific orders
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const orders = await Order.findAll({
                include: [{ model: User, attributes: ['name', 'email'] }],
                order: [['createdAt', 'DESC']]
            });
            res.json(orders);
        } else {
            const orders = await Order.findAll({
                where: { userId: req.user.id },
                order: [['createdAt', 'DESC']]
            });
            res.json(orders);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/orders/:id
// @desc    Update order status
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    const { status } = req.body;

    try {
        let order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
