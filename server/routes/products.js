const express = require('express');
const router = express.Router();
const { Product, Review } = require('../models');
const auth = require('../middleware/auth');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Review }]
        });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
    // Check if admin
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    const { name, description, price, category, image, inStock, discount } = req.body;

    try {
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            image,
            inStock,
            discount
        });

        res.json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    const { name, description, price, category, image, inStock, discount } = req.body;

    try {
        let product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.image = image || product.image;
        if (inStock !== undefined) product.inStock = inStock;
        if (discount !== undefined) product.discount = discount;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        let product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        await product.destroy();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
