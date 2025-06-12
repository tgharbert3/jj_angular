const mongoose = require('mongoose');
const { userSchema } = require('../schema/user.schema.js');
const conn = require('../config/db_conn.js');

const path = require('path');

const connection = mongoose.createConnection(conn);

async function initConnection() {
    await connection.asPromise();
}
initConnection();

const userModel = connection.model('users', userSchema);