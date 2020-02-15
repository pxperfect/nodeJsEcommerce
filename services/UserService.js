const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');
const logError = require('../utils/errorLoger');

class UserService {
    async save(user) {
        try {
            const db = await getDb();
            if (db) return db.collection('users').insertOne(user);
        } catch (e) {logError(e, 'UserService.js', 'save')}
    }
    async findById(id) {
        try {
            const db = await getDb();
            let user;
            if (db) {
                user = await db.collection('users').find({_id: new mongodb.ObjectID(id)}).toArray();
                return user[0];
            }
        } catch (e) {logError(e, 'UserService.js', 'findById')}
    }
}

module.exports = new UserService();