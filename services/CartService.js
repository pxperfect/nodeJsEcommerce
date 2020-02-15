const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');
const logError = require('../utils/errorLoger');
const ProductsService = require('./ProductsService');
const UserService = require('./UserService');

class CartService {
    // Add product to cart if no exists else increase quantity by 1.
    async addToCart(userId, productId) {
        try {
            const db = await getDb();
            if (!db) throw new Error('No database connection in cartService in addToCart method');

            const user = await UserService.findById(userId);
            const product = await ProductsService.findById(productId);
            let items = [];

            if (!user.cart.hasOwnProperty('cartItems')) {
                product.quantity = 1;
                items.push(product);
                return db.collection('users').updateOne(
                    {_id: mongodb.ObjectID(userId)}, {$set: {'cart.cartItems': items}}
                    );
            }

            items = [...user.cart.cartItems];
            const itemIndex = items.findIndex(index => {
                const indexID = mongodb.ObjectID(index._id).toString();
                const productId = mongodb.ObjectID(product._id).toString();
                return indexID === productId;
            });

            if (itemIndex !== -1) {
                items[itemIndex].quantity ++;
                return db.collection('users').updateOne(
                    {_id: mongodb.ObjectID(userId)}, {$set: {'cart.cartItems': items}}
                    );
            }

            product.quantity = 1;
            items.push(product);
            return db.collection('users').updateOne(
                {_id: mongodb.ObjectID(userId)}, {$set: {'cart.cartItems': items}}
                );
        } catch (e) {logError(e, 'CartService.js', 'addToCart')}
    }
    async getCart(userId) {
        try {
            const user = await UserService.findById(userId);
            if (user.cart.hasOwnProperty('cartItems')) {
                return user.cart.cartItems;
            }
            return [];
        } catch (e) {logError(e, 'CartService.js', 'getCart')}
    }
    async deleteProduct(userId, productId) {
        try {
            const db = await getDb();
            if (db) {
                const user = await UserService.findById(userId);
                const products = user.cart.cartItems;
                const itemIndex = products.findIndex(index => {
                    const indexID = mongodb.ObjectID(index._id).toString();
                    return indexID === productId;
                });
                products.splice(itemIndex, 1);
                return db.collection('users').updateOne(
                    {_id: mongodb.ObjectID(userId)}, {$set: {'cart.cartItems': products}}
                    );
            }

        } catch (e) {logError(e, 'CartService.js', 'deleteProduct')}
    }
    async findById(id) {
        try {
            const db = await getDb();
            let user;
            if (db) {
                user = await db.collection('users').find(
                    {_id: new mongodb.ObjectID(id)}
                    ).toArray();
                return user[0];
            }
        } catch (e) {logError(e, 'CartService.js', 'findById')}
    }
}


module.exports = new CartService();