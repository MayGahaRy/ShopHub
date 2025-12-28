const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = decoded.user;

        // Update lastActive timestamp (non-blocking)
        const { User } = require('../models');
        User.update({ lastActive: new Date() }, { where: { id: req.user.id } }).catch(() => { });

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
