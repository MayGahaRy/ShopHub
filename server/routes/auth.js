const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user', // Default role
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        });

        // Return JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Special Admin Login Check
        if (email === 'admin' && password === 'admin') {
            // In a real app, you'd have an admin user in DB. For this demo, we simulate it or check against specific DB record.
        }

        let user;

        if (email === 'admin' && password === 'admin') {
            // Find the seeded admin or the placeholder admin
            user = await User.findOne({ where: { role: 'admin' } });

            if (!user) {
                // Fallback: Create placeholder if not found (shouldn't happen with seed)
                [user] = await User.findOrCreate({
                    where: { id: 9999 },
                    defaults: {
                        id: 9999,
                        name: 'Administrator',
                        email: 'admin@store.com',
                        password: 'hardcoded_admin',
                        role: 'admin',
                        avatar: 'https://ui-avatars.com/api/?name=Admin&background=000000&color=ffffff'
                    }
                });
            }
        } else {
            user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: 360000 },
            async (err, token) => {
                if (err) throw err;
                // Update lastActive on successful login
                await User.update({ lastActive: new Date() }, { where: { id: user.id } });
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/user
// @desc    Get logged in user
// @access  Private
router.get('/user', require('../middleware/auth'), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/users
// @desc    Get all users (Public/Admin for demo)
// @access  Public
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/logout
// @desc    Logout user & clear online status
// @access  Private
router.post('/logout', require('../middleware/auth'), async (req, res) => {
    try {
        // Mark as offline by setting lastActive to 10 mins ago
        const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
        await User.update({ lastActive: tenMinsAgo }, { where: { id: req.user.id } });
        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
