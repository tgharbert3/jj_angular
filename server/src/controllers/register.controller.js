const { insertNewUser } = require('../services/register.service');
const argon2 = require('argon2');

/**
 * Controller function for inserting a new user
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} password 
 * @returns {object} user object
 */
async function insertNewUserController(firstName, lastName, email, password) {
    try {

        const hashedPassword = await hashPassword(password);
        const newUser = await insertNewUser(firstName, lastName, email, hashedPassword);
        if (newUser) {
            return newUser;
        } else {
            return null;
        }

    } catch (error) {
        return "Error in insertering new user controller";
    };
}

/**
 * Takes a password and returns the hased version
 * @param {string} password 
 * @returns {string} hased password
 */
async function hashPassword(password) {

    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new Error("Couldnt has password");
    }
}

module.exports = { insertNewUserController };

