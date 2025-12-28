const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Review = require('./Review');
const Coupon = require('./Coupon');
const Message = require('./Message');

// Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

// Export models and sequelize instance
module.exports = {
    sequelize,
    User,
    Product,
    Order,
    Review,
    Coupon,
    Message
};
