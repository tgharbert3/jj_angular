import { db } from "../config";

/**
 * function to fetch the posts from the db
 * @param userID The user which to retieve the posts for
 * @returns an array of posts or an empty array
 * Author: tgh
 */
export async function getAllPostsFromDB(userID: number) {
    try {
        const posts = await db.manyOrNone('SELECT * FROM POSTS WHERE userID = $1', [userID])
        return posts
    } catch (error) {
        console.error(error);
        throw Error(`Error fetching posts from db ${error}`);
    }
};