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

/**
 * Function to add a post to the db
 * @param postText The text for the post
 * @param fileName The filename for the optional photo
 * @param userID : the user it belongs to
 */
export async function addPostToDb(postText: string, fileName: string, userID: number) {
    try {
        const newPost = await db.one(`INSERT INTO posts(postText, fileName, userID) VALUES ($1, $2) RETURNING postID`, [postText, fileName, userID]);
        return newPost;
    } catch (error) {
        console.error(error);
        throw Error(`Error adding post from service ${error}`);
    }
};