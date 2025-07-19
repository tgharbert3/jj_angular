import mongoose from "mongoose";
import userSchema from "../schema/user.schema";



const userModel = mongoose.models.User || mongoose.model('User', userSchema);

/**
 * Inserts a new user into mongoDB
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} hashedPassword 
 * @returns {object} newUser
 */
export async function insertNewUser(firstName: string, lastName: string, email: string, hashedPassword: string) {

    try {
        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        if (newUser) {
            return newUser
        } else {
            return null;
        }

    } catch (error) {
        console.error('Error inserting new user:', error);
        throw error;
    }
}

