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
}

// import mongoose from 'mongoose';
// import userSchema from '../schema/user.schema';

// const userModel = mongoose.models.User || mongoose.model('User', userSchema);

// /**
//  * Fetches user from the db
//  * @param {string} email 
//  * @returns User object or Null
//  */
// export async function fetchUserByEmail(email: string) {

//     try {
//         const user = await userModel.findOne({ email: email });
//         if (user) {
//             return user
//         } else {
//             console.error("No user found");
//             return null
//         }
//     } catch (error) {
//         console.error("Error fetching user: ", error);
//         throw error;
//     }
// }