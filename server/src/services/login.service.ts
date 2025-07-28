import { db } from '../config';

/**
 * Fetches user from the postgres db
 * @param {string} email 
 * @returns User object or Null
 */
export async function fetchUserByEmail(email: string) {
    try {
        const user = await db.one('SELECT * FROM users.jj_users WHERE email = $1', [email]);
        return user;
    } catch (error) {
        console.error("No user found");
        throw error;
    }
};