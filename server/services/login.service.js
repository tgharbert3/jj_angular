const mongoose = require('mongoose');
const { userSchema } = require('../schema/user.schema.js');
const conn = require('../config/db_conn.js');

const connection = mongoose.createConnection(conn);

async function initConnection() {
    await connection.asPromise();
}
initConnection();

const userModel = connection.model('users', userSchema);

/**
 * Fetches user from the db
 * @param {string} email 
 * @returns User object or Null
 */
async function fetchUserByEmail(email) {

    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            return user
        } else {
            console.error("No user found");
            return null
        }
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw error;
    }
}

module.exports = { fetchUserByEmail }