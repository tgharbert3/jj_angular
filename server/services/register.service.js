const mongoose = require('mongoose');
const { userSchema } = require('../schema/user.schema')

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

/**
 * Inserts a new user into mongoDB
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} hashedPassword 
 * @returns {object} newUser
 */
async function insertNewUser(firstName, lastName, email, hashedPassword) {

    try {
        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        return newUser
    } catch (error) {
        console.error('Error inserting new user:', error);
        throw error;
    }
}

module.exports = {
    insertNewUser,
}