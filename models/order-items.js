const Sequalize = require('sequelize');
const sequalize = require('../utils/database');

// Cart may belong to single User but may contain multiple products.
const OrderItems = sequalize.define('orderItems', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequalize.INTEGER
    }
});

module.exports = OrderItems;