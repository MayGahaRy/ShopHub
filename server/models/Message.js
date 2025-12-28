const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    sender: {
        type: DataTypes.STRING, // 'user' or 'admin'
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true // Can be empty if it's an image
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'text'
    },
    image: {
        type: DataTypes.TEXT('long'), // Start with plenty of space for base64
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Message;
