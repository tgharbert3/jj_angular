import { db } from '../config';

/**
 * Inserts a new user into postgres
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} hashedPassword 
 * @returns {object} newUser
 */
export async function insertNewUser(firstName: string, lastName: string, email: string, password: string) {
    try {
        const newUser = await db.one(`INSERT INTO users.jj_users (firstName, lastName, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [firstName, lastName, email, password]);
        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

