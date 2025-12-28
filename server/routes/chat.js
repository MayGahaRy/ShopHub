const express = require('express');
const router = express.Router();
const { Message, User } = require('../models');
const auth = require('../middleware/auth');

// @route   GET api/chat
// @desc    Get chat messages for current user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'ASC']]
        });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/chat
// @desc    Send a message
// @access  Private
router.post('/', auth, async (req, res) => {
    const { text, sender, targetUserId, type, image } = req.body; // sender: 'user' or 'admin'

    try {
        let conversationUserId = req.user.id;

        // If admin is replying, they must specify which user they are talking to
        if (req.user.role === 'admin' && targetUserId) {
            conversationUserId = targetUserId;
        }

        const message = await Message.create({
            text,
            sender: sender || 'user',
            userId: conversationUserId,
            type: type || 'text',
            image
        });
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/chat/admin/all
// @desc    Get all messages grouped by user (For Admin Support)
// @access  Private (Admin)
router.get('/admin/all', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        const messages = await Message.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password'] } // Get all info except password
            }],
            order: [['createdAt', 'ASC']]
        });

        // Debug logging for the user's terminal
        console.log(`[CHAT ADMIN] Found ${messages.length} messages. User data attached to ${messages.filter(m => m.User).length} messages.`);

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
