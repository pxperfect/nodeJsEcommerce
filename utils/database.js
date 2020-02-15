const MongoClient = require('mongodb').MongoClient;
const logError = require('../utils/errorLoger');
const uri = "mongodb+srv://marcin:marcin@nodeapp-j9xgz.mongodb.net/project?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let clientConnection;
let db;

const mongoConnect = async () => {
    try {
        clientConnection = await client.connect();
        db = await client.db();
        return db;
    } catch (e) {logError(e, 'database.js', 'mongoConnect')}
};

const getDb = async () => {
    if (db) return db;
    throw 'No database connection';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


