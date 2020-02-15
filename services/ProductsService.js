const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');
const Product = require('../models/product');
const logError = require('../utils/errorLoger');

class ProductsService {
    async save(product) {
        try {
            const db = await getDb();
            if (db) return db.collection('product').insertOne(product);
        } catch (e) {logError(e, 'productsService.js', 'save')}
    }
    async fetchAll() {
        try {
            const db = await getDb();
            if (db) return db.collection('product').find({}).toArray();
        } catch (e) {logError(e, 'productsService.js', 'fetchAll')}
    }
    async findById(id) {
        try {
            const db = await getDb();
            let product;
            if (db) {
                product = await db.collection('product').find({_id: new mongodb.ObjectID(id)}).toArray();
                return product[0];
            }
        } catch (e) {logError(e, 'productsService.js', 'findById')}
    }
    async update(id, req) {
        try {
            const db = await getDb();
            const {title, imageUrl, price, description} = req.body;
            const newProduct = new Product(title, price, imageUrl, description);
            if (db) return db.collection('product').updateOne({_id: new mongodb.ObjectID(id)}, {$set: newProduct});
        } catch (e) {logError(e, 'productsService.js', 'update')}
    }
    async delete(id) {
        try {
            const db = await getDb();
            if (db) return db.collection('product').deleteOne({_id: new mongodb.ObjectID(id)});
        } catch (e) {logError(e, 'productsService.js', 'delete')}
    }
}

module.exports = new ProductsService();