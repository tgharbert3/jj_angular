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
        throw Error(`Error: ${(error as Error).message}`)
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
        const newPost = await db.oneOrNone(`INSERT INTO posts(postText, fileName, userID) VALUES ($1, $2, $3) RETURNING postID`, [postText, fileName, userID]);
        return newPost;
    } catch (error) {
        console.error(error);
        throw Error(`Error: ${(error as Error).message}`)
    }
};

/**
 * Service layer function to update a post in the db
 * @param userId user which the post belongs to
 * @param postId which post to update
 * @param postText the new post text
 * @param fileName the new filename
 * @returns The updated post information
 */
export async function updatePostInDb(userId: number, postId: number, postText: string, fileName: string) {
    try {
        const updatedPost = await db.oneOrNone(`UPDATE posts SET postText = $3, fileName = $4 WHERE userid = $1 AND postid = $2 RETURNING *`, [userId, postId, postText, fileName]);
        return updatedPost;
    } catch (error) {
        console.error(error);
        throw Error(`Error: ${(error as Error).message}`)
    }
};

/**
 * Service layer function to delete a post from the db
 * @param postId the post to delete
 * @returns The information from the deleted post
 */
export async function deletePostFromDb(postId: number) {
    try {

        const deletedPosted = await db.oneOrNone(`DELETE FROM posts WHERE postID = $1 RETURNING *`, [postId]);
        return deletedPosted;
    } catch (error) {
        console.error(error);
        throw Error(`Error: ${(error as Error).message}`)
    }
};