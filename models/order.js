const Sequalize = require('sequelize');
const sequalize = require('../utils/database');

// Order may belong to single User but may contain multiple products.
const Order = sequalize.define('order', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports =Order;