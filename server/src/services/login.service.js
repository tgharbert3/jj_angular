const mongoose = require('mongoose');
const { userSchema } = require('../schema/user.schema')

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

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