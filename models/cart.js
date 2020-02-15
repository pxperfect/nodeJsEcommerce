const Sequalize = require('sequelize');
const sequalize = require('../utils/database');

// Cart may belong to single User but may contain multiple products.
const Cart = sequalize.define('cart', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;