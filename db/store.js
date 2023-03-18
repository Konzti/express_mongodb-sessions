import session from 'express-session';
import mongoSess from 'connect-mongodb-session';
import env from 'dotenv';

env.config({ path: '../.env' });
const conn = process.env.MONGODB_URI;
const MongoDBStore = mongoSess(session);

const store = new MongoDBStore({
    uri: conn,
    databaseName: "node-login",
    collection: "sessions"
}, function (error) {
    if (error) { console.log(error); }
});


export default store;