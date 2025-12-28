const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    reviews_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Product;
