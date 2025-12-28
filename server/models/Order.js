const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Processing' // Processing, Shipped, Delivered
    },
    items: {
        type: DataTypes.TEXT, // Storing JSON string of items for simplicity in SQLite
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('items');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('items', JSON.stringify(value));
        }
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Order;
