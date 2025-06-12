const { fetchUserByEmail } = require('../services/login.service');
const argon2 = require('argon2');

/**
 * Controller function to verify user information
 * @param {string} email 
 * @param {string} password 
 * @returns user
 */
async function loginUserController(email, password) {
    try {
        const userFromDB = await fetchUserByEmail(email);
        if (userFromDB) {
            const matched = await verifyPassword(password, userFromDB.password)
            if (matched) {
                //start session and return
                return userFromDB.email;
            }
        } else {
            return "User not Found";
        }
    } catch (error) {
        console.error("Login Error", error);
        throw error
    }
}

/**
 * Verifes if hashed passwords match
 * @param {string} inputPassword 
 * @param {string} dbPassword 
 * @returns boolean 
 */
async function verifyPassword(inputPassword, dbPassword) {
    try {
        if (await argon2.verify(dbPassword, inputPassword)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Password verification failed", error);
        return false;
    }
}

module.exports = {
    loginUserController,
}